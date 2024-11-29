export const applyFilter = (queryBuilder, filterType: string, value: any) => {
    switch (filterType) {
        case 'author':
            return queryBuilder.andWhere('book.author LIKE :author', { author: `%${value}%` });
        case 'year':
            return queryBuilder.andWhere('book.year = :year', { year: value });
        case 'genre':
            return queryBuilder.andWhere('book.genre LIKE :genre', { genre: `%${value}%` });
        default:
            return queryBuilder;
    }
}