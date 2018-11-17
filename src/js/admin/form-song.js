{
  let view = {
     el:".formWrapper",
     template:`
		<form class="form">
				<label class="row">
					歌手
				</label>
				<input name="singer" type="text" value="singerdata"/>
				<label class="row">
					歌名
				</label>
				<input name="name" value="namedata"/>
				<label class="row">
					链接
				</label>
				<input name="url" type="text" value="urldata"/>
                <label class="row">
                    图片链接
                </label>
                <input name="imgurl" type="text" value="imgurldata"/>
                <label class="row">
                </label>
                <label class="row buttonWrapper">
				<button class="button">保存</button>
                </label>   
        </form>
	  `,
	  //data = {} data为undefined的时候为空对象
     render(data = {}){
        let html = this.template;
        let value = ["singerdata","urldata","namedata","imgurldata"];
        value.map((string)=>{
           html = html.replace(`${string}`,data[string] || '') 
        })
        $(this.el).html(html)
        if(data.id){
            $(this.el).prepend("<h2 class='topic'>编辑歌曲</h2>")
        }else{
            $(this.el).prepend("<h2 class='topic'>新建歌曲</h2>")
        }
     } 
  }
  let model = {
      data:{namedata:"",urldata:"",singerdata:"",imgurldata:"",id:""},
      create(data){
        var Song = AV.Object.extend('Song');
        var song = new Song();
        song.set('namedata', data.namedata);
        song.set('urldata', data.urldata);
        // 只要添加这一行代码，服务端就会自动添加这个字段
        song.set('singerdata',data.singerdata);
        song.set('imgurldata',data.imgurldata);
        return song.save().then((song) => {
          let attributes = song.attributes
          let id = song.id;
          this.data.id = id;
          this.data.namedata = attributes.namedata;
          this.data.urldata = attributes.urldata;
          this.data.singerdata = attributes.singerdata;
          this.data.imgurldata = attributes.imgurldata;
        }, function (error) {
          // 异常处理
        });
      }
  }
  let controller = {
      init(view , model){
          this.view = view;
          this.model = model;
          this.bindEvenets();
          this.view.render(this.model.data)
          window.eventHub.on("upload",(data)=>{
            this.model.data = data;   
            this.view.render(this.model.data)
          })
          window.eventHub.on("new",(data)=>{
              if(this.model.data.id){
                 this.model.data = {namedata:"",urldata:"",singerdata:"",imgurldata:"",id:""}
                 console.log("123")
                }else{
                    console.log("id不存在")
                    Object.assign(this.model.data,data)
              }
              this.view.render(this.model.data)
          })
          window.eventHub.on("select",(data)=>{
              this.model.data = data;
              this.view.render(this.model.data)
          })
      },
      change(data){
        let dot = ["singer","name","url","imgurl"]
        let datas = data;
        dot.map((string)=>{
            datas[string + "data"] = $(this.view.el).find(`[name = ${string}]`).val();
        })
        var song= AV.Object.createWithoutData('Song', data.id);
        // 修改属性
        song.set('namedata',datas.namedata );
        song.set('singerdata', datas.singerdata);
        // 保存到云端
        return song.save();
      },
      bindEvenets(){
          //获取input框中的输入的内容
          $(this.view.el).on("submit","form",(e)=>{
                e.preventDefault();
                if(this.model.data.id){
                    //获取输入框的值
                this.change(this.model.data).then(()=>{
                    window.eventHub.emit("update",JSON.parse(JSON.stringify(this.model.data)))
                }) 
                }else{
                    let dot = ["singer","name","url","imgurl"]
                    let data = this.model.data;
                    dot.map((string)=>{
                        data[string + "data"] = $(this.view.el).find(`[name = ${string}]`).val();
                    })
                    this.model.create(data).then(()=>{
                        let string = JSON.stringify(data);
                        let object = JSON.parse(string)
                        window.eventHub.emit("catchList",object)
                    })
                }
          })
      } 
  }
  controller.init(view,model)   
}
