export const joinRouteTitles = (matchResults) => {
    let title;
    const lastOne = matchResults[matchResults.length-1];
    if (lastOne.route.title) {
        const titles = [];
        for (let i = matchResults.length-1; i >= 0; i-- ) {
            const r = matchResults[i];
            if (r.route.title) {
                titles.push(r.route.title);
            }
        }
        title = titles.join('-');
    }
    return title;
};