export default class Preloader{
	constructor(options){

		this.assets = {}
		for(let asset of options.assets){
			this.assets[asset] = { loaded:0, complete:false }
			this.load(asset)
		}
		this.container = options.container

		if (options.onprogress==undefined){
            this.onprogress = onprogress
            this.domElement = document.createElement("section")
			this.domElement.style.position = 'absolute'
			this.domElement.style.top = '0'
			this.domElement.style.left = '0'
			this.domElement.style.width = '100%'
			this.domElement.style.height = '100%'
			this.domElement.style.background = '#000'
			this.domElement.style.display = 'flex'
			this.domElement.style.alignItems = 'center'
            this.domElement.style.justifyContent = 'center'
            this.domElement.style.flexDirection =  'column'

			this.domElement.style.zIndex = '999'
            const loaderDiv = document.createElement("div")
            loaderDiv.style.width= '500px'
            loaderDiv.style.height= '500px'
            loaderDiv.style.border = '15px groove #FCF204'
            loaderDiv.style.borderRadius = '50%'
            loaderDiv.style.transform = 'rotate(360deg)'
            loaderDiv.style.transition = 'all 1s ease'
            loaderDiv.style.animation = 'loader-1-inner 1s ease-out alternate infinite'
            this.domElement.appendChild(loaderDiv)
            
            const loaderPourcentage = document.createElement("div")
            loaderPourcentage.style.width= '100px'
            loaderPourcentage.style.height= '100px'
            loaderPourcentage.style.marginTop = '25px'
            loaderPourcentage.style.color= '#fff'
            loaderPourcentage.style.textAlign = 'center'
            loaderPourcentage.textContent = ` `
            this.domElement.appendChild(loaderPourcentage)

            this.progressPourcentage = loaderPourcentage

			if (this.container!=undefined){
                this.container.appendChild(this.domElement)
			}else{
                document.body.appendChild(this.domElement)
			}
		}else{
			this.onprogress = options.onprogress
		}

        this.oncomplete = options.oncomplete
        const loader = this
		function onprogress(delta){
			const progress = delta
            loader.progressPourcentage.textContent = `${Math.round(progress*100)}`
		}
	}

	checkCompleted(){
		for(let prop in this.assets){
			const asset = this.assets[prop]
			if (!asset.complete) return false
		}
		return true
	}

	get progress(){
		let total = 0
		let loaded = 0

		for(let prop in this.assets){
			const asset = this.assets[prop]
			if (asset.total == undefined){
				loaded = 0
				break
			}
			loaded += asset.loaded
			total += asset.total
		}

		return loaded/total
	}

	load(url){
		const loader = this
		var xobj = new XMLHttpRequest()
		xobj.overrideMimeType("application/json")
		xobj.open('GET', url, true)
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				  loader.assets[url].complete = true
				  if (loader.checkCompleted()){
					  if (loader.domElement!=undefined){
						  if (loader.container!=undefined){
							  loader.container.removeChild(loader.domElement)
						  }else{
							  document.body.removeChild(loader.domElement)
						  }
					  }
					  loader.oncomplete()
				  }
			  }
		}
		xobj.onprogress = function(e){
			const asset = loader.assets[url]
			asset.loaded = e.loaded
			asset.total = e.total
			loader.onprogress(loader.progress)
		}
		xobj.send(null)
	}
}