const axios = require('axios');
const cheerio = require('cheerio');

const fallbackData = [
  {
    rank: 1,
    title: "Toy Story 5",
    weekendGross: "$160M",
    totalGross: "$227M",
    weeks: 1,
    imdbUrl: "https://www.imdb.com/title/tt29355505/?ref_=chtbo_t_1",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLr08Mz5FnnQM9uwFqLtra69-xczA4fI1WgzGLoSizA&s=10"
  },
  {
    rank: 2,
    title: "Disclosure Day",
    weekendGross: "$18M",
    totalGross: "$86M",
    weeks: 2,
    imdbUrl: "https://www.imdb.com/title/tt15047880/?ref_=chtbo_t_2",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQcqFGEwU_2Xw-2d-aUOuAy-qcCGPb6YuHDHFOOLWYqw&s=10"
  },
  {
    rank: 3,
    title: "Obsession",
    weekendGross: "$13M",
    totalGross: "$224M",
    weeks: 6,
    imdbUrl: "https://www.imdb.com/title/tt37287335/?ref_=chtbo_t_3",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7s57wWxhnq6twvklanmjlUHMR1w7BWvTMvBMHTgBlUg&s=10"
  },
  {
    rank: 4,
    title: "Backrooms",
    weekendGross: "$7.2M",
    totalGross: "$180M",
    weeks: 4,
    imdbUrl: "https://www.imdb.com/title/tt26657236/?ref_=chtbo_t_4",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt03HkeSmdevM6jvDMxZvL-70bIZyqDHUtVEw-MoV9Q&s=10"
  },
  {
    rank: 5,
    title: "Scary Movie",
    weekendGross: "$6.4M",
    totalGross: "$101M",
    weeks: 3,
    imdbUrl: "https://www.imdb.com/title/tt32093575/?ref_=chtbo_t_5",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4O72Hrtxt3lvzPBNWawOfCb5cUfjPDJ4vatIqgb0kiQ&s"
  },
  {
    rank: 6,
    title: "Masters of the Universe",
    weekendGross: "$6.2M",
    totalGross: "$60M",
    weeks: 3,
    imdbUrl: "https://www.imdb.com/title/tt0427340/?ref_=chtbo_t_6",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcnSnluODKEuHELlylQJdYU-DPJg1gw1b_8vVV5CrMw&s"
  },
  {
    rank: 7,
    title: "Star Wars: The Mandalorian and Grogu",
    weekendGross: "$4.2M",
    totalGross: "$174M",
    weeks: 5,
    imdbUrl: "https://www.imdb.com/title/tt30825738/?ref_=chtbo_t_7",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWvourdE02taxcZsELl4wGozNg7EOi4aMXvo_D37zSA&s=10"
  },
  {
    rank: 8,
    title: "The Death of Robin Hood",
    weekendGross: "$2.9M",
    totalGross: "$4.2M",
    weeks: 1,
    imdbUrl: "https://www.imdb.com/title/tt32273171/?ref_=chtbo_t_8",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxP_WfGzaVBKNu2PpZH0B_1ch3JqNSI1BFDubJkJ3SA&s=10"
  },
  {
    rank: 9,
    title: "Leviticus",
    weekendGross: "$2.6M",
    totalGross: "$4.4M",
    weeks: 1,
    imdbUrl: "https://www.imdb.com/title/tt39143902/?ref_=chtbo_t_9",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW5fb5wBVeR_Cv9JUcnWCHPyNJ_NshCAD6jZRV3fMT8A&s"
  },
  {
    rank: 10,
    title: "Michael",
    weekendGross: "$2.2M",
    totalGross: "$369M",
    weeks: 9,
    imdbUrl: "https://www.imdb.com/title/tt11378946/?ref_=chtbo_t_10",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawsX_CbHSlkAhjVJDU7zljEibw58HD8b2P-WohshARA&s=10"
  }
];

const scrapeIMDb = async () => {
  try {
    const response = await axios.get('https://www.imdb.com/chart/boxoffice/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    });

    const $ = cheerio.load(response.data);
    const movies = [];

    // Current IMDb structure usually contains a JSON script tag with __NEXT_DATA__
    const nextDataScript = $('#__NEXT_DATA__').html();
    if (nextDataScript) {
      const data = JSON.parse(nextDataScript);
      const edges = data.props?.pageProps?.pageData?.chartTitles?.edges || [];
      
      edges.forEach((edge, index) => {
        if (index >= 10) return; // Top 10 only
        const node = edge.node;
        
        movies.push({
          rank: index + 1,
          title: node?.titleText?.text || 'Unknown',
          weekendGross: node?.weekendGross?.total?.total?.text || '-',
          totalGross: node?.gross?.total?.total?.text || '-',
          weeks: node?.weeksInRelease || 0,
          imdbUrl: `https://www.imdb.com/title/${node?.id}/`,
          poster: node?.primaryImage?.url || ''
        });
      });

      if (movies.length > 0) {
        return movies;
      }
    }

    // Fallback: use generic Cheerio parsing if the __NEXT_DATA__ isn't available
    $('.ipc-metadata-list-summary-item').each((i, el) => {
      if (i >= 10) return;
      
      const titleElement = $(el).find('.ipc-title__text');
      const title = titleElement.text().replace(/^\d+\.\s*/, '').trim();
      const href = $(el).find('a.ipc-title-link-wrapper').attr('href');
      const imdbUrl = href ? `https://www.imdb.com${href.split('?')[0]}` : '';
      const poster = $(el).find('.ipc-image').attr('src') || '';

      const stats = [];
      $(el).find('.sc-b4e41383-0.cIryqY.cli-title-metadata-item').each((idx, statEl) => {
        stats.push($(statEl).text());
      });

      let weekendGross = '-';
      let totalGross = '-';
      let weeks = 0;

      // Extract based on textual matching if possible
      const listItems = $(el).find('.ipc-inline-list__item');
      listItems.each((idx, item) => {
        const text = $(item).text();
        if (text.includes('Weekend')) weekendGross = text.replace('Weekend', '').trim();
        if (text.includes('Gross')) totalGross = text.replace('Gross', '').trim();
        if (text.includes('Weeks')) weeks = parseInt(text.replace('Weeks', '').trim()) || 0;
      });

      movies.push({
        rank: i + 1,
        title,
        weekendGross,
        totalGross,
        weeks,
        imdbUrl,
        poster
      });
    });

    if (movies.length === 0) {
      console.warn("Could not parse IMDb data, using fallback data");
      return fallbackData;
    }

    return movies;
  } catch (error) {
    console.error('Error scraping IMDb:', error.message);
    console.warn("Using fallback data due to error");
    return fallbackData;
  }
};

module.exports = { scrapeIMDb };
