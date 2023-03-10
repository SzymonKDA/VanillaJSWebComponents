import scroll from "../../utils/scroll.js";
import router from "../../utils/router.js";
export default class Ul{
    constructor(props, state){
        this.$el = document.createElement('ul');
        this.$el.className = props.class;
        this.state = state; 
        this.render(props.content);
    }
    checkIcons(content, contentKeys, index){
        if(contentKeys.includes('icon')){
            const img = document.createElement('img');
            img.src = content.icon.src;
            img.alt = content.icon.alt;
            return img;
        }else if(contentKeys.includes('icons')){
            const img = document.createElement('img');
            img.src = content.icons[index].src;
            img.alt = content.icons[index].alt;
            return img;
        }
        return '';
    }
    render(content){ ;
        let contentKeys = Object.keys(content);
        if(contentKeys.includes('links')){
            content.links.forEach((link, index) => {
                const $li = document.createElement('li');
                //className of text content is equal in every case
                const $a = document.createElement('a');
                $a.className = "li-content";
                $a.href = link;
                if(contentKeys.includes('text')){
                    $a.innerText = content.text[index]
                }
                // $a.addEventListener("click", (event)=>{
                //     // if(contentKeys.includes('router')){
                //     //     // console.log(content.onclick[index]);
                //     //     // if(content.router[index]){
                //     //     //     router;
                //     //     // }
                //     //     router;
                //     // }
                //     // if(link.includes("#")){
                //     //     scroll(link, this.state)
                //     // }
                //     router;
                // });
                if(link.includes("#")){
                    $a.onclick = () => scroll(link, this.state)
                }else if(contentKeys.includes('router') && content.router[index]){
                    $a.onclick = (event) => router(event);
                }else if(contentKeys.includes('target') && content.target[index]){
                    $a.target = "_blank";
                }
                $li.append(this.checkIcons(content, contentKeys, index));
                $li.append($a)
                this.$el.append($li);
            })
        }else if(contentKeys.includes('text')){
            content.text.forEach((text, index) => {
                const $li = document.createElement('li');
                const $liContent = document.createElement('span');
                $liContent.className = "li-content";
                $liContent.textContent = text;
                $li.append(this.checkIcons(content, contentKeys, index));
                $li.append($liContent);
                this.$el.append($li);
            })
        }
    }
}