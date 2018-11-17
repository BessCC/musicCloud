//获取查询参数的方式是window.location.search
//有段时间将表达式当做值来操作，所有没有显示
//filter方法必须接受一个函数，如果传入的参数返回的结果还是这个参数，那么就是去除空字符，
//对于数组而言
{
    view = {
        el:"#app",
        render(data){
            let {song} = data
            $(this.el).css("background-image",`url(${song.imgurldata})`);
            $(this.el).find(".cover").attr("src",song.imgurldata)
            if(data.status === "playing"){
                $(this.el).find(".cover").addClass("playing");
                $(this.el).find(".icon-play").addClass("playing")
                $(this.el).find(".pause").addClass("playing")
            }else{
                $(this.el).find(".icon-play").removeClass("playing")
                $(this.el).find(".cover").removeClass("playing");
                $(this.el).find(".pause").removeClass("playing");
            }

            if($(this.el).find("audio").attr("src") !== song.urldata){
                $(this.el).find("audio").attr("src",song.urldata)                      
            }
       
        },
        //使用js控制他的播放和暂停
        play(){
            let music = $(this.el).find("audio")[0];
            music.play()
        },
        pause(){
            let music = $(this.el).find("audio")[0];
            music.pause()
        }
    }
    model = {
        data:{
          song:{
            id:"",
            name:"",
            singer:"",
            url:"",
            imgurldata:""
        },
        status:"pause"
        },

        getSong(){
            var query = new AV.Query('Song');
            return query.get(this.data.id).then(function (song) {
               return {id:song.id,...song.attributes};
              // 成功获得实例
              // todo 就是 id 为 57328ca079bc44005c2472d0 的 Todo 对象实例
            }, function (error) {
              // 异常处理
            });
        }
    }
    controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.model.data.id = this.getId();
            this.model.getSong().then((data)=>{
                this.model.data.song = data;
                this.view.render(this.model.data)
            })
            this.bindPlay();
            this.bindPause()    
        },
        bindPlay(){
            $(this.view.el).on("click",".icon-play",()=>{
                this.model.data.status = "playing"
                this.view.render(this.model.data)
                this.view.play()
            })
        },
        bindPause(){
            $(this.view.el).on("click",".pause",()=>{
                this.model.data.status = "pause"
                console.log("123")
                this.view.render(this.model.data)
                this.view.pause()
            })
        },
        getId(){
            let data = window.location.search;
            let datas
            if(data.indexOf("?") === 0){
                data = data.slice(1)
                data = data.split("&").filter((data)=>data)
                for(let i=0;i<data.length;i++){
                   let key = data[i].split("=")[0]
                   let value = data[i].split("=")[1]
                   if(key === "id"){
                        datas = value
                        break
                   }
                } 
            }
           return datas  
        }
    }
    controller.init(view,model)
}

    
    