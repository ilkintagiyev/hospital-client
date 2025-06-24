import api from "@/constants/api";
import { useEffect, useState } from "react";

interface Service {
    value: number;
    label: string;
}

export function useServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        api
            .get<any[]>("/services")
            .then((res) => {
                const serviceData = res.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                }));
                setServices(serviceData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message || "Xəta baş verdi");
                setLoading(false);
            });
    }, []);

    return { services, loading, error };
}
