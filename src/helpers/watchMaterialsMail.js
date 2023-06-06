import moment from "moment";
const email = () => {



    //START TIME AND END TIME
    const now = new Date();

    const test = now.setDate(now.getDate() + 1);

    const test2 = new Date(test)

    return {
        now,
    }
};

export default email