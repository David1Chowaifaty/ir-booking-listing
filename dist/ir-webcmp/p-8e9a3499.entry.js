import{r as t,h as e,H as i}from"./p-0679b1cc.js";const o=".sc-ir-tooltip-h{position:relative}.tooltip-icon.sc-ir-tooltip{margin:0 5px;padding:0}.tooltip-inner-custom.sc-ir-tooltip{min-width:max-content !important}";const s=o;const c=class{constructor(e){t(this,e);this.message=undefined;this.withHtml=true;this.customSlot=false;this.open=undefined}toggleOpen(t){if(this.tooltipTimeout){clearTimeout(this.tooltipTimeout)}if(t){this.tooltipTimeout=setTimeout((()=>{this.open=true}),300)}else{this.open=false}}render(){return e(i,{key:"1a8c65cfe804cf63385beb505f3fa2bd233a750e",class:"m-0 p-0"},e("span",{key:"279696ee3492bb995dd1b422bf1a2bc64400e4da",onMouseEnter:()=>this.toggleOpen(true),onMouseLeave:()=>this.toggleOpen(false)},!this.customSlot?e("svg",{"data-toggle":"tooltip","data-placement":"top",xmlns:"http://www.w3.org/2000/svg",height:"16",width:"16",class:"tooltip-icon",viewBox:"0 0 512 512"},e("path",{fill:"#6b6f82",d:"M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"})):e("slot",{name:"tooltip-trigger"})),this.open&&e("div",{key:"6e8c79e8794cc9f0d581e6f495ccac9a63362b57",class:"tooltip bottom show position-absolute",role:"tooltip"},e("div",{key:"abe9936aea17fbc1b9ec786ecfdc74c960692137",class:"tooltip-arrow"}),e("div",{key:"5e2c25a0f57d084c97416d5a03e17796937c9a0d",class:`tooltip-inner fit ${this.customSlot&&"tooltip-inner-custom"}`},e("span",{key:"355c00613e18e859013b125c303cc5accc4aecd2",innerHTML:this.message}))))}};c.style=s;export{c as ir_tooltip};
//# sourceMappingURL=p-8e9a3499.entry.js.map