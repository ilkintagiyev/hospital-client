export interface IDoctors {
    doctor_id: number;
    user_id: number;
    name: string;
    surname: string;
    email: string;
    telephone: string;
    photo: string;
    experience_years: number;
    gender: 'male' | 'female' | string;
    work_days: string[] | null;
    rating: number | null;
    service_id: number;
    service_name: string;
}