import React from "react";
import "./Blog.css";
import {Article} from "../../components";
import {blog1, blog2, blog3, blog4, blog5} from "./imports";
const Blog = () =>{

    return(
        <div className="bingen__blog section__padding" id="blog">
            <div className="bingen__blog-heading">
                <h1 className="gradient__text">Exploring the Latest Breakthrough in the World of AI Innovation</h1>
            </div>
            <div className="bingen__blog-container">
                <div className="bingen__blog-container_groupA">
                    <Article imgUrl={blog4} title={"Musicians Creating Using AI"} link={"https://time.com/5774723/ai-music/"} description={"'There's a Wide-Open Horizon of Possibility.' Musicians Are Using AI to Create Otherwise Impossible New Songs."} second={"In November, the musician Grimes made a bold prediction. “I feel like we’re in the end of art, human art,” she said on Sean Carroll’s Mindscape podcast. “Once there’s actually AGI (Artificial General Intelligence), they’re gonna be so much better at making art than us.”"}/>
                </div>
                <div className="bingen__blog-container_groupB">
                    <Article imgUrl={blog1} title={"AI in the music industry"} link={"https://www.ft.com/content/2c1c2016-69b7-48aa-b333-4c1380bb9102"} description={"New tools can create compositions, clone voices and recommend songs to listeners — but can it match the human interaction with fans?"}  />
                    <Article imgUrl={blog2} title={"The new AI innovation equation"} link={"https://www.ibm.com/watson/advantage-reports/future-of-artificial-intelligence/ai-innovation-equation.html"}  description={"After decades of experiencing a slow burn, artificial intelligence innovation has caught fire to become the hottest item on the agendas of the world’s top technology firms."}/>
                    <Article imgUrl={blog3} title={"What’s the Future for A.I.?"} link={"https://www.nytimes.com/2023/03/31/technology/ai-chatbots-benefits-dangers.html"} description={"Where we’re heading tomorrow, next year and beyond. Many experts believe A.I. will make some workers, including doctors, lawyers and computer programmers, more productive than ever. They also believe some workers will be replaced."}/>
                    <Article imgUrl={blog5} title={"Musicians, Machines, and the AI-Powered Future of Sound"} link={"https://www.wired.co.uk/article/generative-ai-music"}  description={"Fears that computers could replace composers are real. But some music-makers are finding ways to harness generative AI creatively."}/>
                </div>
            </div>
        </div>
    )
}
export default Blog;