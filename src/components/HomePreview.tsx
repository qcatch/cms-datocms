"use client";
import { useQuerySubscription } from "react-datocms";
import Hero from "@/components/Hero";

export function RealtimeHome({ subscription }) {
  const { data, error, status } = useQuerySubscription(subscription);
  // console.log(data, error, status);
  return (
    <div className="space-y-20">
      {data?.home?.homehero?.map((hero) => (
        <Hero
          key={hero.title}
          title={hero.title}
          buttons={hero.buttons}
          image={hero.image}
        />
      ))}
    </div>
  );
}
