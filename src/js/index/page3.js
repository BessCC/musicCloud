{
    let view = {
        el:".page-3"
    }
    let model = {
    }
    let controller = {
         init(view,model){
           this.view = view;
           this.model = model;  
           this.eventHub() 
         },
         eventHub(){
            window.eventHub.on("tabs",(tabname)=>{
                console.log($(this.view.el))
                if(tabname === "page-3"){
                    $(this.view.el).addClass("active")
                }else{
                    $(this.view.el).removeClass("active")
                }
            }) 
         }

    }
    controller.init(view,model)
}