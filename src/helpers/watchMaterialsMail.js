import moment from "moment";
const email = () => {



    //START TIME AND END TIME
    const now = new Date();

    console.log(now);

    const test = now.setDate(now.getDate() + 1);

    const test2 = new Date(test)

    console.log(test2);

    return {
        now,
    }
};

export default email