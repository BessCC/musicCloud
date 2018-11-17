{
    let view = {
        el:".page-1"
    }
    let model = {

    }
    let controller = {
         init(view,model){
           this.view = view;
           this.model = model;  
           this.eventHub();
           this.loadPage11();
           this.loadPage12(); 
         },
         eventHub(){
            window.eventHub.on("tabs",(tabname)=>{
                if(tabname === "page-1"){
                    $(this.view.el).addClass("active")
                }else{
                    $(this.view.el).removeClass("active")
                }
            }) 
         },
         loadPage11(){
             let script1 = document.createElement("script");
             script1.src="./js/index/page11.js";
             document.body.append(script1)
         },
         loadPage12(){
            let script2 = document.createElement("script");
            script2.src="./js/index/page12.js";
            document.body.append(script2)
         }

    }
    controller.init(view,model)
}