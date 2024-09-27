import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { faker } from '@faker-js/faker';
import 'dotenv/config';
import './load-env.mjs';

// configures AWS DynamoDB
const dynamoDb = new DynamoDB({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
console.log(process.env.AWS_REGION);

// generates new reservations
function generateNewReservations(count) {
    const data = [];

    // should update this to take from customer table, faker uses count/4 to ensure multiple reservations per member for analytics
    const memberIds = faker.helpers.multiple(() => faker.string.alphanumeric({ length: 8, casing: 'upper'}), { count: count/4 });
    const transactionDates = faker.helpers.multiple(() => faker.date.past({ years: 3 }), { count: count });
    
    // generates flight dates within 1 year after transaction date
    const flightDates = [];
    for (let i = 0; i < count; i++) {
        flightDates.push(
            faker.date.soon({ days: 365, refDate: transactionDates[i] })
        )
    };

    console.log('Generating ', count, ' new reservations');

    for (let i = 0; i <count; i++) {
        data.push({
            RecordLocator: faker.airline.recordLocator({ allowNumerics: true }),
            ActivityDateTime: transactionDates[i],
            MemberId: faker.helpers.arrayElement(memberIds),
            OriginAirport: faker.airline.airport().iataCode,
            DestinationAirport: faker.airline.airport().iataCode,
            Seat: faker.airline.seat(),
            FlightNumber: faker.airline.flightNumber(),
            FlightDate: flightDates[i],
            TotalFare: faker.finance.amount({ min: 99, max: 5000 }) 
        });
    };

    return data;
}

// writes reservations to DynamoDB
async function addReservationsToDynamo(data) {
    const count = data.length;
    console.log('Adding ', count, 'reservations to DynamoDB');

    for (let i = 0; i < count; i++) {
         // Convert each property to the appropriate DynamoDB AttributeValue type
         const dynamoDbItem = {
            RecordLocator: { S: data[i].RecordLocator },
            ActivityDateTime: { S: data[i].ActivityDateTime.toISOString() }, // Convert Date to ISO string
            MemberId: { S: data[i].MemberId },
            OriginAirport: { S: data[i].OriginAirport },
            DestinationAirport: { S: data[i].DestinationAirport },
            Seat: { S: data[i].Seat },
            FlightNumber: { S: data[i].FlightNumber },
            FlightDate: { S: data[i].FlightDate.toISOString() }, // Convert Date to ISO string
            TotalFare: { N: data[i].TotalFare.toString() } // Convert number to string
        };
        console.log(dynamoDbItem);

        await dynamoDb.putItem({ TableName: 'AirlineReservation', Item: dynamoDbItem});
        console.log(`Added reservation ${dynamoDbItem.RecordLocator.S}`);
    }

}

// seeds database
async function seedDatabase(count) {
    const reservations = await generateNewReservations(count);
    console.log(reservations);
    await addReservationsToDynamo(reservations);
    console.log('Added ', reservations.length, ' reservation to DynamoDB.')
};

seedDatabase(50);