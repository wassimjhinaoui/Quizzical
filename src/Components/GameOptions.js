import React from "react";

export default function GameOptions(props){
    return(
        <div className="game--options">
            <label>
                Category : 
                <select 
                    name="game_category"
                    value={props.options.game_category}
                    onChange={props.handleChange}
                >
                    <option value="any">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Film</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals and Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="17">Science and Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="31">Entertainment: Japanese Anime and Manga</option>
                    <option value="32">Entertainment: Cartoon and Animations</option>
                </select>
            </label>
            <label>
                Difficulty :
                <select 
                    name="game_difficulty"
                    value={props.options.game_difficulty}
                    onChange={props.handleChange}
                >
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <fieldset>
                <legend>With Counter ? </legend>
                <span>
                <input 
                    type="radio"
                    id="with"
                    name="counter"
                    value="with"
                    checked={props.options.counter === "with"}
                    onChange={props.handleChange}
                />
                <label htmlFor="with">With</label>
                </span>
                <span>
                <input 
                    type="radio"
                    id="without"
                    name="counter"
                    value="without"
                    checked={props.options.counter === "without"}
                    onChange={props.handleChange}
                />
                <label htmlFor="without">Without</label>
                </span>
            </fieldset>
        </div>
    )

}