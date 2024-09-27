import { PaperAirplaneIcon } from "@heroicons/react/16/solid"
import { Reservation } from "../lib/definitions"

export function FlightDetails({ reservation }: { reservation: Reservation }) {
    return (
        <div key={reservation.RecordLocator}>
            <p className='font-bold text-xl mb-4'>Confirmation: {reservation.RecordLocator}</p>
            <div className='rounded-md shadow-lg border-2 bg-tinybird-gray-background border-tinybird-space-cadet p-4 text-2xl'>
                <div className='flex items-center justify-between w-full p-4 font-bold'>
                    <p className='text-6xl'>{reservation.OriginAirport}</p>
                    <PaperAirplaneIcon className='h-[60px] w-[60px] text-tinybird-emerald' />
                    <p className='text-6xl'>{reservation.DestinationAirport}</p>
                </div>
                <div className='flex items-center justify-between w-full p-4'>
                    <div>
                        Time
                        <p className='font-bold'>{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(reservation.FlightDate))}, {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(reservation.FlightDate))}</p>
                    </div>
                    <div>
                        Flight
                        <p className='font-bold'># {reservation.FlightNumber}</p>
                    </div>
                    <div>
                        Seat
                        <p className='font-bold'>{reservation.Seat}</p>
                    </div>
                    <div>
                        Member Id
                        <p className='font-bold'>{reservation.MemberId}</p>
                    </div>
                </div>

            </div>
        </div>
    )
};

export function FlightList({ reservation }: { reservation: Reservation }) {
    const flightDate = new Date(reservation.FlightDate);
    const isPastFlight = flightDate < new Date();

    return (
        <>
        { isPastFlight ?
            // past flight display
            <div 
                key={reservation.RecordLocator}
                className='rounded-md shadow-md border-1 bg-tinybird-gray-background border-tinybird-space-cadet p-2 text-sm'
            >
                <b>{reservation.RecordLocator}</b> | {reservation.OriginAirport} to {reservation.DestinationAirport} ({flightDate.toDateString()})
            </div> :
            // future flight display
            <div key={reservation.RecordLocator} className = 'rounded-md shadow-lg border-2 bg-white border-tinybird-space-cadet p-4 text-lg' >
                <p className='text-base'>
                    {flightDate.toDateString()}
                </p>
                <p className='text-4xl font-bold'>{reservation.OriginAirport} to {reservation.DestinationAirport}</p>
                <p className='text-xl'>{reservation.RecordLocator}</p>
            </div >
        }
        </>
    )
};