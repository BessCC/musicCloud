{
    let view = {
        el:".songList",
        template:`
        <ul>
        </ul>
        `,
        render(data){
            console.log(data)
            let {song,selectId} = data;
            $(this.el).html(this.template);
            let aa = song.map((item)=>{
                let $li = $('<li></li>').text(item.namedata).attr("data-id",item.id);
                if(item.id === selectId){
                    $li.addClass("active")
                }
                return $li
            })
            aa.map((item)=>{
                $(this.el).find("ul").append(item)
            })
        }
    }
    let model = {
        data:{
            song:[],
            selectId:""
        },
        find(){
            var songs = new AV.Query('Song');
            return songs.find().then((songs)=>{
                this.data.song = songs.map((songs)=>{
                    return {id:songs.id,...songs.attributes}
                })
            }) 
        }
    }
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.bindEvent();
            this.bindEventHub();
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEventHub(){
            window.eventHub.on('catchList',(data)=>{
                this.model.data.song.push(data)
                this.view.render(this.model.data)
            })
            window.eventHub.on("new",()=>{
                $(this.view.el).find("li").removeClass("active");
            }) 
            window.eventHub.on("update",(data)=>{
                let datas = this.model.data;
                for(let i=0;i<datas.song.length;i++){
                   if(datas.song[i].id ===data.id ){
                       datas.song[i] = data;
                   }                
               }
               this.view.render(datas)
            })           
        },
        bindEvent(){
            $(this.view.el).on("click","li",(e)=>{
                let dataId = $(e.currentTarget).attr("data-id");
                this.model.data.selectId = dataId;
                console.log(this.model.data.selectId);
                this.view.render(this.model.data);
                let datas
                let songs = this.model.data.song; 
                for(let i=0;i < songs.length; i++){
                    if(songs[i].id === dataId){
                        datas = songs[i];
                        break
                    }
                }
                //深度拷贝
                let object = JSON.parse(JSON.stringify(datas))
                window.eventHub.emit("select",object) 
            }) 
         }
    }
    controller.init(view,model)
}