import React from "react";
import "./Article.css";

const Article = (props) => {

    return (
        <div className="bingen__blog-container_article">
            <div className="bingen__blog-container_article-image">
                <img src={props.imgUrl} alt="blog image"/>
            </div>
            <div className="bingen__blog-container_article-content">
                <div>
                    <p>{props.date}</p>
                    <h3>{props.title}</h3>
                    <h2>{props.description}</h2>
                    <br/>
                    <h2>{props.second}</h2>
                </div>
                <a href={props.link}>Read Full Article</a>
            </div>
        </div>
    )
}

export default Article;