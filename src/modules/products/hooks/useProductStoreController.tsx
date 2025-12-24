import {useMemo, useState} from "react";
import {testProducts} from "@/modules/products/data/data-test";
import {useCartStore} from "@/modules/products/stores/cartStroe";

export const useProductStoreController = () => {
    const products = testProducts;
    const {items, addItem, removeItem} = useCartStore();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    const filteredProducts = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return products;
        return products.filter((p) => {
            const code = p.code?.toLowerCase() ?? "";
            const name = p.name?.toLowerCase() ?? "";
            return code.includes(term) || name.includes(term);
        });
    }, [products, search]);

    const totalItems = filteredProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    const paginatedProducts = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, page, pageSize]);

    const onPrevPage = () => setPage((prev) => Math.max(1, prev - 1));
    const onNextPage = () => setPage((prev) => Math.min(totalPages, prev + 1));
    const onPageChange = (newPage: number) => setPage(newPage);

    const isInCart = (productId: string) => items.some((item) => item.id === productId);

    const handleToggleCart = (productId: string, checked: boolean) => {
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        if (checked) {
            addItem(
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    priceAlt: product.priceAlt,
                },
                1,
            );
        } else {
            removeItem(product.id);
        }
    };

    return {
        products,
        search,
        page,
        pageSize,
        totalItems,
        totalPages,
        paginatedProducts,
        // cart
        items,
        isInCart,
        handleToggleCart,
        // setters / handlers
        setSearch,
        setPage,
        onPrevPage,
        onNextPage,
        onPageChange,
    };
};

