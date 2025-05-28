"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
    const sessionState = useSession();
    return (
       <div>
        <Card>
            <CardHeader>
                <CardTitle>Tableau de bord</CardTitle>

            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
       </div>
    );
};

export default Dashboard;