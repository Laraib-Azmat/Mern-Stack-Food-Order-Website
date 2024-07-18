import { Fragment, useState } from "react";
import MealSummary from "./MealSummary";
import MealList from "./MealList";
import { Menu } from "../Menu/Menu";
import Card from "../UI/Card";


const Meals = () => {

    const [category, setCategory] = useState("All")


    return (
        <Fragment>
            <MealSummary />
            <Card>
            <Menu category={category} setCategory={setCategory} />
            <MealList category={category} />
            </Card>
      </Fragment>  
    );
}

export default Meals;