import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
    <h1>hello world</h1>
    <Button><a href="sign-in">sign-in</a></Button>   
    <Button><a href="sign-up">sign-up</a></Button>
   </div>
  );
}
