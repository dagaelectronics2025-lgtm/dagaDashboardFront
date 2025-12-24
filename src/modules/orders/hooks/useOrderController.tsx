import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {useMemo, useState} from "react";
import type {Order} from "@/modules/orders/data/types.ts";
import {useOrdersApi} from "@/modules/orders/hooks/useOrdersApi.ts";
import {type OrderFormValues, orderSchema} from "@/modules/orders/data/schemas.ts";

export const useOrderController = () => {
    const {useCreateOrder, useUpdateOrder, useGetOrders, useDeleteOrder} = useOrdersApi();

    // DATA
    const {data: orders, refetch: refetchOrders} = useGetOrders();

    // SEARCH STATE
    const [search, setSearch] = useState("");

    const filteredOrders = useMemo(() => {
        if (!orders) return [];
        const term = search.trim().toLowerCase();
        if (!term) return orders;

        return orders.filter((order) => {
            const code = order.code?.toLowerCase() ?? "";
            const customer = order.customer?.toLowerCase() ?? "";
            const seller = order.seller?.toLowerCase() ?? "";
            return (
                code.includes(term) ||
                customer.includes(term) ||
                seller.includes(term)
            );
        });
    }, [orders, search]);

    // PAGINATION STATE
    const [page, setPage] = useState(1);
    const pageSize = 12; // 4x3 grid
    const totalItems = filteredOrders.length;
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1;
    const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

    // STATES
    const [showDialogCreate, setShowDialogCreate] = useState(false);
    const [showDialogEdit, setShowDialogEdit] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // INFO MODAL STATE
    const [selectedOrderInfo, setSelectedOrderInfo] = useState<Order | null>(null);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const openInfoModal = (order: Order) => {
        setSelectedOrderInfo(order);
        setShowInfoModal(true);
    };

    const closeInfoModal = () => {
        setShowInfoModal(false);
        setSelectedOrderInfo(null);
    };

    // ACTIONS
    const {mutate: create} = useCreateOrder();
    const {mutate: update} = useUpdateOrder(selectedOrder?.id || "");
    const {mutateAsync: deleteOrder} = useDeleteOrder(selectedOrder?.id || "");

    // FORMS
    const formCreate = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            customer: "",
            seller: "",
            total: 0,
            status: "PENDING",
        },
    });

    const formEdit = useForm<OrderFormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            customer: "",
            seller: "",
            total: 0,
            status: "PENDING",
        },
    });

    // METHODS
    const onCreate = (values: OrderFormValues) => {
        create(values, {
            onSuccess: async (created) => {
                console.log("ORDER CREATED >> ", created);
                toast.success("Orden creada exitosamente", {className: "success"});
                await refetchOrders().then(() => setShowDialogCreate(false));
                formCreate.reset();
            },
        });
    };

    const onUpdate = (values: OrderFormValues) => {
        const {code, ...rest} = values as any; // keep behavior, but code isn't en el schema
        update(rest, {
            onSuccess: async (updated) => {
                console.log("ORDER UPDATED >> ", updated);
                toast.success("Orden actualizada exitosamente", {className: "success"});
                await refetchOrders().then(() => setShowDialogEdit(false));
                formEdit.reset();
            },
        });
    };

    const onDelete = async () => {
        await deleteOrder(undefined, {
            onSuccess: async () => {
                console.log("ORDER DELETED >> ", selectedOrder?.id || "");
                toast.success("Orden eliminada exitosamente", {className: "success"});
                await refetchOrders();
            },
        });
    };

    return {
        orders,
        filteredOrders,
        paginatedOrders,
        page,
        pageSize,
        totalPages,
        setPage,
        search,
        setSearch,
        showDialogCreate,
        showDialogEdit,
        selectedOrder,
        selectedOrderInfo,
        showInfoModal,
        openInfoModal,
        closeInfoModal,
        formCreate,
        formEdit,
        onCreate,
        onUpdate,
        onDelete,
        setShowDialogCreate,
        setShowDialogEdit,
        setSelectedOrder,
    };
};
