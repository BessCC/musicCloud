{
    let view = {
        el:"#tabs"
    }
    let model = {}
    let controller = {
        init(view,model){
           this.view = view;
           this.model = model;
           this.bindEvent() 
        },
        bindEvent(){
            $(this.view.el).on("click","li",(e)=>{
                $(e.currentTarget).addClass("active").siblings().removeClass("active");
                let tabname = $(e.currentTarget).attr("data-tab-name");
                window.eventHub.emit("tabs",tabname)
            })
        }
    }
    controller.init(view,model)
}