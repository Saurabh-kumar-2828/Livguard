export function getContentGenerator(vernacularData: {[id: string]: string}) {
    return (id: string) => {
        if (!(id in vernacularData)) {
            // throw new Error(`"${id}",`);
            console.log(`"${id}",`);
        }
        return vernacularData[id] ? vernacularData[id] : "Invalid String";
    };
}
