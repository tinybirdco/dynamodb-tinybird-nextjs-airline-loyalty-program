'use client';

import NavBar from "./components/navbar";
import Search from "./components/search";
import { Reservation } from "./lib/definitions";
import useFetchApi from "./lib/fetch";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FlightList, FlightDetails } from "./components/flight-displays";
import { StatusProgress } from "./components/charts";


export default function Home() {
  const searchParams = useSearchParams();
    const searchValue = searchParams.get('query')?.toUpperCase();
    console.log('Searching for: ', searchValue);
    const baseUrl = process.env.NEXT_PUBLIC_TINYBIRD_BASE_URL + '/pipes/get_reservations.json?token=' + process.env.NEXT_PUBLIC_TINYBIRD_ADMIN_TOKEN;
    const [url, setUrl] = useState(baseUrl + '&search_value=' + searchValue);


    const token = process.env.NEXT_PUBLIC_TINYBIRD_STATIC_READ_TOKEN ?? '';
const apiurl = process.env.NEXT_PUBLIC_TINYBIRD_API_BASE_URL ?? '';
  console.log(token,apiurl);
    const { data: reservations } = useFetchApi<Reservation[]>(url);
    console.log(reservations);

    useEffect(() => {
        const updatedUrl = `${baseUrl}&search_value=${searchValue}`
        setUrl(updatedUrl)
    }, [searchValue, baseUrl])

  return (
      <div>
        <NavBar />
          <div className={'flex flex-1 mx-auto justify-center items-center w-full max-w-screen-xl max-h-full min-h-1100px py-8'}>
              <div className='w-4/5 space-y-4'>
                  <Search placeholder={"Search for a record locator or member id"} />
                  <div className='min-h-1/6 h-auto h-min-16 rounded-md bg-white shadow-tinybird-emerald shadow-md p-5 space-y-3'>

                        {/* Conditionally display "Member Id" or "No results found" */}
                        {searchValue && searchValue.length === 8 && reservations && reservations.length > 0 ? (
                          <p className='font-bold text-xl mb-4'>Reservations for Member {searchValue}</p>
                        ) : searchValue && reservations && reservations.length === 0 ? (
                          <p>No results found.</p>
                        ) : null} {/* Render nothing if no search or results are loading */}

                      {/* Display flight list or flight details depending on search */}
                      {reservations?.map((reservation: Reservation) => (
                          !(searchValue && searchValue.length === 6) ? (
                            <>
                              <FlightList key={reservation.RecordLocator} reservation={reservation} />
                              
                            </>
                          ) : (
                              <FlightDetails key={reservation.RecordLocator} reservation={reservation} />
                          )
                      ))}
                  </div>

                  {/* Display progress chart when reservations exist and member was searched */}
                  {searchValue && searchValue.length === 8 && reservations && reservations.length > 0 && 
                  <div className='min-h-1/6 h-auto h-min-16 rounded-md bg-white shadow-tinybird-emerald shadow-md p-5 space-y-3'>
                    <StatusProgress member_id={searchValue} />
                  </div>}
              </div>
          </div>
      </div>
  );
}
