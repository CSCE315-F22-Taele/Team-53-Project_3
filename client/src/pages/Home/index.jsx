import * as React from "react";
import "./index.css";


const Home = () => {
    const name = "Pom and Honey at Texas A&M MSC";
    return (
        <div class="home__header" background="./food">
            <div class="home__title">{name}</div>
            <div class="home__subtitle">
                <h2>
                    {" "}
                    We offer one of a kind Mediterranean food for all visitors
                    of Texas A&M's Memorial Student Center.{" "}
                </h2>
            </div>
        </div>
    );
};

export default Home;
