"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
    const sessionState = useSession();
    return (
       <div>
        <Card>
            <CardHeader>
                <CardTitle>Tableau de bord</CardTitle>
                <CardDescription>
                    Bienvenue, {sessionState?.data?.user.name }!
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Voici un aperçu de votre tableau de bord.</p>
                total des annoncees: 0
                <br />

                <Button>Ajouter une annonce</Button>
                <br />
                list des annonces:
                <ul>
                    <li>Annonce 1</li>
                    <li>Annonce 2</li>
                    <li>Annonce 3</li>  
                </ul>
                
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
       </div>
    );
};

export default Dashboard;