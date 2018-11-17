{
    view= { 
        el:".loading",
        active(){
            $(this.el).addClass("open")
        },
        inactive(){
            $(this.el).removeClass("open")
        }
    }
    controller= {
        init(view){
           this.view = view;
           this.eventHub() 
        },
        eventHub(){
            window.eventHub.on("beforeUpload",()=>{
              this.view.active()
            })
            window.eventHub.on("afterUpload",()=>{
               this.view.inactive()
            })
        }
    }
    controller.init(view)
}
