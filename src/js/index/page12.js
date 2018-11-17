{
    view = {
        el:"#songs",
        render(data){
            let {song} = data;
            let li = song.map((songs)=>{
                return $(`
                <li>
                <h3>${songs.namedata}</h3>
                <p>
                    <svg class="icon icon-sq">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
                    </svg>
                ${songs.singerdata}
                </p>
                <a class="playButton" href="./song.html?id=${songs.id}">
                    <svg class="icon icon-play">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                    </svg>
                </a>
                </li>
                `)  
            })
            $(this.el).append(li)
        }
    }
    model = {
        data:{
            song:[]
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
    controller = {
        init(view,model){
            this.view = view;
            this.model = model;
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
        }
    }
    controller.init(view,model)
}