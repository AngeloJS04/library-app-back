export const paginate = async (queryBuilder, page: number = 1, limit: number = 10) => {
    const take = limit;
    const skip = (page - 1) * take;

    queryBuilder.take(take).skip(skip);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return {
        data,
        pagination: {
            totalItems: total,
            totalPages,
            currentPage: page,
            pageSize: take,
        },
    };
}