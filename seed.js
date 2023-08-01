const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL)

const Book = require('./models/book');

async function seed() {
    await Book.create(
        {
            title: 'Whispers of the Forest',
            descritpion: 'A gripping fantasy novel about a young adventurer who embarks on a quest to save a mystical forest from dark forces, facing trials and making unlikely alliances along the way.',
            status: ['Available in bookstores'],
        }
    );

    await Book.create(
        {
            title: 'Echoes of Eternity',
            descritpion: 'A thought-provoking sci-fi masterpiece exploring the intricacies of time travel and its consequences, as a scientist delves into the enigmatic echoes of the past and future.',
            status: ['Out of stock', 'Reprinting'],
        }
    );

    await Book.create(
        {
            title: 'The Art of Serenity',
            descritpion: 'A captivating self-help guide that offers practical insights and exercises to cultivate inner peace and mindfulness, empowering readers to navigate lifes challenges with grace.',
            status: ['In stock', 'Bestseller'],
        }
    );

    await Book.create(
        {
            title: 'Beyond the Horizon',
            descritpion: 'An epic historical fiction saga set in the 19th century, following the destinies of three families across continents, love, loss, and their relentless pursuit of dreams.',
            status: ['Available in e-book format'],
        }
    );

    await Book.create(
        {
            title: 'Shadows of the Night',
            descritpion: 'A gripping psychological thriller where a detective races against time to solve a series of mysterious murders, delving into the darkness of the human psyche.',
            status: ['Pre-order', 'releasing next month'],
        }
    )

    console.log('I love reading');
    mongoose.disconnect()
}

seed();