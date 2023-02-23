export async function sendDataToFreshSales(formResponse : {mobile_number:string, first_name: string,email: string, city?: string}){

    try{
        const response = await fetch(`${process.env.FRESH_SALES_API_END_POINT}/contacts`, {
            method: "POST",
            headers: {
                "Authorization": `Token token=${process.env.FRESH_SALES_API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formResponse),
        });

        console.log("Response", response);
    }catch (e) {
        console.log("Fresh Sales API Exception");
        console.log(e);

        return null;
    }
}
