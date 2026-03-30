"use client";
import { useEffect, useState } from "react";
import { BranchForm } from "@/app/(dashboard)/branch/components/BranchForm/BranchForm";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/app/features/lib/api-client";

interface StationFormData {

  station_name: string;
  gps_location: string;
  phone: string;
  division: string;
  city: string;
  address: string;
  description: string;
  branches_id: string;
  id: string;
  branches: string;
  branches_name: string;
}


export default function UpdateBranch() {

    const params = useParams();
    const stationId = params.id;
    const router = useRouter();


    const [stationData, setStationData] = useState<StationFormData | undefined>(
        undefined
    );

    const [branches, setBranches] = useState<any[]>([]);

    useEffect(() => {
        const fetchStationData = async () => {
            try {
                const response = await apiClient.get(
                    `/master-company/stations/${stationId}`
                );
                const rawData = (response as { data?: unknown }).data || response;
                const typedData = rawData as StationFormData;
                if (typedData) {
                    const formattedData: StationFormData = {
                        ...typedData,
                        branches_id: typedData.branches_id || "",
                    };
                
                    setStationData(formattedData);
                }
                
            } catch (error) {
                console.error("Error fetching station data:", error);
            }
        };

        if (stationId) {
            fetchStationData();
        }
    }, [stationId]);

    console.log("Station Data:", stationData);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const res = await apiClient.get("/master-company/branches");

                const raw = (res as any).data || res;

                setBranches(raw);
            } catch (error) {
                console.error("Error fetching branches:", error);
            }
        };

        fetchBranches();
    }, []);
    console.log("branches on station update", branches);

    const handleUpdate = async (data: Record<string, any>) => {
        try {
            const { id, branch, ...filteredData } = data;
            
            const payload: Partial<StationFormData> = { ...filteredData };
            if (!payload.branches_id) {
                delete payload.branches_id;
            }
            await apiClient.patch(`/master-company/stations/${stationId}`, payload);
            router.push("/station");
        } catch (error) {
            console.error("Error updating station:", error);
        }
    };

   


    return !stationData ? (
        <div>Loading...</div>
    ) : (
        <BranchForm
            mode="update"
            initialData={stationData}   
            onSubmit={handleUpdate}
            nameField="station_name"
            nameLabel="Station Name"
            dropdown={{
                label: "Branch",
                name: "branches_id",
                options: branches.map((b) => ({
                    id: b.id,
                    name: b.branches_name,
                })),
            }}
        />
    );

}