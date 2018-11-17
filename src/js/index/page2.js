{
    let view = {
        el:".page-2"

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
                if(tabname === "page-2"){
                    $(this.view.el).addClass("active")
                }else{
                    $(this.view.el).removeClass("active")
                }
            }) 
         }

    }
    controller.init(view,model)
}