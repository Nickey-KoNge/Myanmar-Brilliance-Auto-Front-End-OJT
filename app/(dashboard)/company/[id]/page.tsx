"use client";

import { useParams, useRouter } from "next/navigation";
import CompanyForm from "../../../../components/company/page.tsx";

export default function UpdateCompany() {
  const { id } = useParams();
  const router = useRouter();

  // 🔥 TEMP DATA (replace with API)
  const company = {
    name: "Myanmar Brilliance Auto",
    email: "myanmarbrillianceauto@gmail.com",
    website: "https://myanmarbrillianceauto.com",
    phone: "0974645555",
    country: "Myanmar",
    city: "Bago",
    address: "No 22, Aung Myitt Thar road",
    regNo: "10387373635",
  };

  const handleUpdate = (data: any) => {
    console.log("UPDATE:", id, data);

    router.push("/company");
  };

  return (
    <CompanyForm
      initialData={company}
      onSubmit={handleUpdate}
      isEdit={true}
    />
  );
}