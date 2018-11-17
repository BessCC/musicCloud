{
    let view = {
        el:".newSong",
        template:`
          新增歌曲
        `,
        render(){
           $(this.el).html(this.template) 
        },
        active(){
            $(this.el).addClass("active")
        },
        cancleActive(){
            $(this.el).removeClass("active")
        }  
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view;
            this.model = model
            this.view.render();
            this.view.active();
            this.bindEvent();
            this.bindEvent();
            window.eventHub.on("select",()=>{
                this.view.cancleActive()
            })
        },
        bindEvent(){
            $(this.view.el).on("click",()=>{
                this.view.active()
                window.eventHub.emit("new")
            })
        }
    }
    controller.init(view,model)
}