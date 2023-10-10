import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { FullWidthImage } from "~/components/images/fullWidthImage";
import { getUserPreferencesFromCookiesAndUrlSearchParameters } from "~/server/utilities.server";
import tailwindStylesheet from "~/tailwind.css";
import type { UserPreferences } from "~/typeDefinitions";
import { getVernacularString } from "~/vernacularProvider";

export const lnks: LinksFunction = () => [
    {
        rel: 'stylesheet', href: tailwindStylesheet
    }

]

type LoaderData = {
    userPreferences: UserPreferences;
};

export const loader: LoaderFunction = async ({request}) => {
    const userPreferences = await getUserPreferencesFromCookiesAndUrlSearchParameters(request);
    if (userPreferences instanceof Error) {
        throw userPreferences;
    }

    const loaderData: LoaderData = {
        userPreferences: userPreferences,
    };

    return loaderData;
};

export default function TestRoute() {
    const {userPreferences} = useLoaderData<LoaderData>();
  return (
    <div>
      <div className="tw-grid tw-grid-cols-1 tw-max-w-7xl tw-m-auto tw-gap-2 tw-p-2 md:tw-grid-cols-2">
        <LeftCol/>
        <div className="tw-grid tw-grid-cols-1 tw-rounded-2xl tw-shadow-2xl tw-text-center tw-p-5 tw-gap-4">
            <div>
            <h1 className="tw-font-bold tw-text-3xl">{getVernacularString("homeS4H1T1", userPreferences.language)}</h1>
            <h1 className="tw-font-bold tw-text-3xl tw-bg-red-700 tw-text-white tw-w-fit tw-m-auto" dangerouslySetInnerHTML={{__html: getVernacularString("homeS4H1T2", userPreferences.language)}}></h1>
            </div>
            <h1 className="tw-font-bold tw-text-2xl">{getVernacularString("homeS4T2", userPreferences.language)}</h1>
            <p>{getVernacularString("homeS4T3", userPreferences.language)}</p>
            <FullWidthImage
                relativePath="/livguard/home/4/1-mobile.jpg"
                className="tw-rounded-lg"
            />
        </div>
      </div>
      <Cards/>
    </div>
  );
}

const LeftCol = () => {
    const [index, setIndex] = useState<number>(0)
    const countRef = useRef(0);
    countRef.current+=1;
    console.log("rendering components", countRef.current)
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev+1)%5)
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-5">
            <SideButtons index = {index} setIndex = {setIndex}/>
            <Corousel index = {index}/>
        </div>
    )
}

const SideButtons = ({index, setIndex}: {index: number, setIndex: React.Dispatch<React.SetStateAction<number>>}) => {
    const {userPreferences} = useLoaderData() as LoaderData;
    return (
        <div className="tw-grid tw-col-span-1 tw-grid-cols-5 tw-p-3 md:tw-grid-cols-1 tw-place-items-center tw-text-center tw-gap-y-3">
            <div className="tw-grid tw-grid-cols-1 tw-justify-center tw-place-items-center" onClick={() => setIndex(0)}>
                <Icon active = {index === 0}/>
                <p>{getVernacularString("homeS3Tab2H", userPreferences.language)}</p>
            </div>
            <div className="tw-grid tw-grid-cols-1 tw-justify-center tw-place-items-center" onClick={() => setIndex(1)}>
                <Icon active = {index === 1}/>
                <p>{getVernacularString("homeS3Tab3H", userPreferences.language)}</p>
            </div>
            <div className="tw-grid tw-grid-cols-1 tw-justify-center tw-place-items-center" onClick={() => setIndex(2)}>
                <Icon active = {index === 2}/>
                <p>{getVernacularString("homeS3Tab1H", userPreferences.language)}</p>
            </div>
            <div className="tw-grid tw-grid-cols-1 tw-justify-center tw-place-items-center" onClick={() => setIndex(3)}>
                <Icon active = {index === 3}/>
                <p>{getVernacularString("homeS3Tab4H", userPreferences.language)}</p>
            </div>
            <div className="tw-grid tw-grid-cols-1 tw-justify-center tw-place-items-center" onClick={() => setIndex(4)}>
                <Icon active = {index === 4}/>
                <p>{getVernacularString("homeS3Tab5H", userPreferences.language)}</p>
            </div>
        </div>
    )
}

const Corousel = ({index}: {index: number}) => {
    const {userPreferences} = useLoaderData() as LoaderData;
    return (
        <div className="tw-col-span-4" style={{height: "100%", textAlign: "center", padding: "15px"}}>
            <h1 className="tw-font-bold tw-text-3xl">{getVernacularString("homeS3H1T1", userPreferences.language)}</h1>
            <h1 className="tw-font-bold tw-text-3xl tw-bg-red-700 tw-text-white tw-w-fit tw-m-auto" dangerouslySetInnerHTML={{__html: getVernacularString("homeS3H1T2", userPreferences.language)}}></h1>
            <CorouselItem index = {index} items = {[1, 2, 3, 4, 5]}/>
        </div>
    )
}

const Icon = ({active}: {active: Boolean}) => {
    return (
        <div style={{borderRadius: "50%", height: '50px', width: '50px', backgroundColor: active? 'red': 'gray', cursor: "pointer"}}>

        </div>
    )
}

const CorouselItem = ({ items, index }: {items: any, index: number}) => {
   
    const {userPreferences} = useLoaderData() as LoaderData;
    return (
      <div className="tw-flex tw-overflow-hidden tw-relative tw-w-full tw-h-fit">
        {items.map((_: any, i: number) => (
          <div
            key={i}
            className="tw-grid tw-grid-cols-1 tw-gap-5 tw-p-3"
            style={{flex: "0 0 100%", transition: "transform 1.5s ease-in-out", transform: `translateX(calc(-100%*${index}))`}}
          >
            <FullWidthImage
                relativePath="/livguard/home/4/1-mobile.jpg"
                className="tw-rounded-lg"
            />
            <h1 className="tw-font-normal">{getVernacularString("homeS3Tab2HC1", userPreferences.language)}</h1>
            <h1 className="tw-font-bold tw-text-2xl">{getVernacularString("homeS3Tab2HC2", userPreferences.language)}</h1>
            <h1>{getVernacularString("homeS3Tab2C", userPreferences.language)}</h1>
            <button className="tw-font-bold tw-bg-red-700 tw-text-white tw-w-fit tw-px-6 tw-py-2 tw-mx-auto tw-rounded-lg">{getVernacularString("homeS3Tab2BT", userPreferences.language)}</button>
          </div>
        ))}
      </div>
    );
  };
  
const Cards = () => {
    const {userPreferences} = useLoaderData<LoaderData>()
    const [viewMore, setViewMore] = useState(true);
    let items = [1, 2, 3, 4, 5, 6];
    // let shownItems = items;
    if(viewMore) {
        items = items.slice(0, 4)
    }
    console.log("items will be --->", items)
    return (
        <div className="tw-py-9">
            <div className="tw-grid tw-grid-cols-1 tw-gap-5 tw-max-w-6xl tw-p-8 tw-m-auto">
                <div>
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("3e16fc04-40ab-4a32-aca8-bb10812fe30d", userPreferences.language)}}
                    />
                    <h2
                        className="lg-text-headline tw-text-center"
                        dangerouslySetInnerHTML={{__html: getVernacularString("52d70e49-05fc-47e2-93c0-104e51b58fbc", userPreferences.language)}}
                    />
                </div>
                <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
                    {
                        items.map((item, i) => {
                            return <CardItem key={i}/>
                        })
                    }
                </div>
                <button onClick={() => setViewMore(!viewMore)} className="tw-w-fit tw-bg-red-600 tw-m-auto tw-px-6 tw-py-2 tw-font-bold tw-rounded-2xl tw-text-white">{viewMore? "View More": "View Less"}</button>
            </div>
        </div>
    )
}

const CardItem = () => {
    return ( 
        <div className="tw-shadow-xl tw-grid tw-grid-cols-1 tw-gap-5 tw-p-4 tw-rounded-lg">
            <FullWidthImage 
                // className="tw-row-start-2"
                relativePath={`/livguard/products/lgbtx7l/thumbnail.png`}
            />
            <div className="tw-w-full tw-text-center lg-text-body-bold lg-text-secondary-900">
                2W battery | 2.5Ah Capacity | 48 months Warranty
            </div>
            <div className="tw-grid tw-grid-cols-3 tw-px-2">
                <img className="tw-w-8 tw-h-8 tw-col-span-1" src="https://ceb8596f236225acd007-8e95328c173a04ed694af83ee4e24c15.ssl.cf5.rackcdn.com/images/hero/what-is-battery-reserve-capacity.jpg" alt="" />
                <span className="tw-col-span-2 tw-my-auto">7 Ah Capicity</span>
            </div>
            <div className="tw-grid tw-grid-cols-3 tw-px-2">
                <img className="tw-w-8 tw-h-7 tw-col-span-1" src="https://www.freeiconspng.com/thumbs/warranty-icon/warranty-icon-png-1.png" alt="" />
                <span className="tw-col-span-2 tw-my-auto">24 + 24* Months Warranty</span>
            </div>
            <div className="tw-w-fit tw-m-auto tw-text-center">Price Under Updation</div>
            <button className="tw-rounded-[22px] tw-text-red-700 tw-font-bold hover:tw-bg-red-600 hover:tw-text-white tw-border-slate-700 tw-border tw-py-2">Explore Battery</button>
        </div>
    )
}