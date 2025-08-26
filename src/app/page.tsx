"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Check, Circle, CircleCheck, CheckCircleIcon } from "lucide-react";
import { AddJobModal } from "@/components/add-job-modal";
import { use } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"

// rest of your imports and type definitions...

export default function Dashboard({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to /today/lembah
    router.push('/today/lembah');
  }, [router]);

  // Rest of your component code...
  const { slug } = use(params)
  // @ts-ignore
  const [activeTab, setActiveTab] = useState<Tab>(slug as Tab);
  // ... rest of your component
}
