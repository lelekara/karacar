import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const annonce = await prisma.annonce.findUnique({ where: { id } });
    if (!annonce) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 });
    }
    return NextResponse.json(annonce);
  }
  const annonces = await prisma.annonce.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(annonces);
}

export async function POST(request: Request) {
    const data = await request.json();
    const annonce = await prisma.annonce.create({
        data: {
            titre: data.titre,
            description: data.description,
            marque: data.marque,
            modele: data.modele,
            prix: data.prix,
            annee: data.annee,
            kilometrage: data.kilometrage,
            carburant: data.carburant,
            boite: data.boite,
            user: {
                connect: { id: data.userId }, // Assurez-vous que userId est passé dans la requête
            }
}});
    return NextResponse.json(annonce, { status: 201 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    if (!id) {
        return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }
    const annonce = await prisma.annonce.delete({
        where: { id },
    });
    return NextResponse.json(annonce, { status: 200 });
}

export async function PUT(request: Request) {
    const data = await request.json();
    const { id, ...updateData } = data;
    if (!id) {
        return NextResponse.json({ error: "ID requis" }, { status: 400 });
    }
    const annonce = await prisma.annonce.update({
        where: { id },
        data: updateData,
    });
    return NextResponse.json(annonce, { status: 200 });
}