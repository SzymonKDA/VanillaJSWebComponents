import Header from "./components/Header.js";
import Explore from "./components/Explore.js";
import ProjectInfo from "./components/ProjectInfo.js";
export default class App {
    //Potem rozdziel state na state (modyfikowalne) i propsy (statyczne) 
    //Pomysł na state: przy zamkach dać okienka do zaznaczania odwiedzone, nie odwiedzone, itd. Dać też summary ulubionych zamków, odwiedzonych, notatki?   
    constructor(){
        this.props = {
            //Jak do tej pory cały statyczny, do propsów
            header: {
                nav: {
                    navContact: {contact: {link: "#contact-form" , text: "Kontakt"}, authors: {link: "#authors", text: "Autorzy"}},
                    ul: {
                        hr: {
                            display: true
                        },
                        class: "desc-list",
                        content: {
                            links: ["#hero", "#explore-container", "#project-desc"],
                            text: ["Start", "Zamki", "O projekcie"]
                        }
                    }
                },
                hero: {
                    description_container: {
                        class: "desc-hero",
                        title: "Pozývame Vás na Slovensko!",
                        description: {
                            class: "desc-p",
                            text: `Slovensko je hornatá krajina, plná hradov a prírody, ideálna na aktívnu dovolenku od jari do zim.
                            </br>Na tejto stránke vám povieme o niektorých hradoch. Pre kurióznejšiech vás však pozývame stlačiť tlačidlo Spoznajte Slovensko.</br></br>
                            Słowacja jest górzystym krajem, pełnym zamków oraz przyrody, jest idealna do aktywnego spędzania czasu od wiosny do zimy. </br> Na tej stronie opowiemy wam o niektórych zamkach, ciekawskich zachęcamy do wciśnięcia przycisku Spoznajte Slovensko`
                        },
                        button: {
                            class: "desc-button",
                            text: "Spoznajte Slovensko"
                        },
                        ul: {
                            hr: {
                                display: true
                            },
                            class: "desc-list",
                            content: {
                                icon: {
                                    src: "./images/circle-check.svg",
                                    alt: "checked "
                                },
                                text: ["Zamki", "Góry", "Cały Rok"]
                            }
                        }
                    },
                    view_container: {
                        class: "view-hero",
                        images: [
                            {alt: "Bojnicki Hrad ", src: "./images/hero_img1.jpg", id: "hero-img-1"},
                            {alt: "Ruiny Hradu ", src: "./images/hero_img2.jpg", id: "hero-img-2"},
                            {alt: "Oravski Hrad", src: "http://sacr3-files.s3-eu-west-1.amazonaws.com/_processed_/csm_Oravsk%25C3%25BD%2520hrad_Oravsk%25C3%25BD%2520Podz%25C3%25A1mok%252C%2520Okres%2520Doln%25C3%25BD%2520Kub%25C3%25ADn%252C%2520Kraj%2520%25C5%25BDilinsk%25C3%25BD%252C%2520Stolica%2520oravsk%25C3%25A1%2520%25281%2529_9a0fc9cddb.jpg", id: "hero-img-3"}
                        ]
                    }
                }
            },
            explore: fetch("./src/content.json").then((response) => {
                if(!response.ok){
                    throw new Error('failed loading, please try again later');
                }
                return response;
            }).then((response) => response.json()),
            projectInfo: {
                projectBrief: {
                    text: `Cześć! Projekt ten powstał w ramach samodoskonalenia się w zakresie frontendu, konkretniej by zrozumieć różne sposoby na tworzenie elementów na stronie w podobnym stylu do reacta.
                    Metody wykorzystane w projekcie: modyfikacja innerHTML'a, z przemieszkami doc.createElement, append, a to czysto createElement, append z propsami i state'm, a także shadow dom.
                    Dzięki temu mogłem lepiej zrozumieć jak działają frameworki typu React, wszystko w formie componentów (chociaż nie chciałem popaść w przesadyzm struktury componentów).
                    A tematyka? Zważywszy na naukę języka słowackiego, była to całkiem dobra okazja by zapełnić tę stronę czymś ciekawym.`,
                    authors:{
                        author1:{
                            img: "./images/authors/szymon.jpg",
                            name: "Szymon Kadaś",
                            roles: {
                                class: "roles",
                                content:{
                                    icons: [
                                        {src: "./images/roles/SASS.svg", alt: "CSS icon"},
                                        {src: "./images/roles/JS.svg", alt: "JS icon"},
                                        {src: "./images/roles/Design.svg", alt: "Design icon"},
                                        {src: "./images/roles/Research.svg", alt: "Content Research icon"},
                                        {src: "./images/roles/ProjectManager.svg", alt: "Manager icon"}
                                    ],
                                    text: ["SASS/CSS", "JS", "Website Design", "Content Research", "Project Manager"]
                                }
                            }
                        },
                        author2:{
                            img: "./images/authors/anonymous.jpg",
                            name: "Kacper B.",
                            roles: {
                                class: "roles",
                                content: { 
                                    icons: [
                                        {src: "./images/roles/Ideas.svg", alt: "Ideas icon"},
                                        {src: "./images/roles/Research.svg", alt: "Content Research icon"},
                                    ],
                                    text: ["Ideas", "Content Reasearch"]
                                }
                            }
                        },
                        author3: {
                            img: "./images/authors/anonymous.jpg",
                            name: "Adrian M.",
                            roles: {
                                class: "roles",
                                content:{
                                    icons: [
                                        {src: "./images/roles/Content.svg", alt: "Content icon"},
                                    ],
                                    text: ["Content Creator"]
                                }
                            }
                        }
                    }
                }
            }
        }
        this.state = {
            //Tutaj dałoby się wsm wsadzić testy!
            projectInfo: {
                contact:{
                    email: "",
                    topic: "",
                    message: "",
                    setEmail: (text)=>{
                       this.email = text; 
                    },
                    setEmail: (text)=>{
                        this.topic = text;
                    },
                    setEmail: (text)=>{
                        this.message = text;
                    }
                }
            }
        }
        this.$root = document.getElementById('root');
        this.render();
    }
    async render(){
        let $header = new Header(this.props.header).$el;
        let $poznaj = new Explore(await this.props.explore).$el;    
        let $projectInfo = new ProjectInfo(this.props.projectInfo, this.state.projectInfo).$el;
        this.$root.append($header);
        this.$root.append($poznaj);
        this.$root.append($projectInfo);
    }
}

new App();