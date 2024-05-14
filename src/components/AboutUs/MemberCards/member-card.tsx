import SocialMedia from "@/components/SocialMedia/social-media";
import { memberData } from "@/data/member-data";
import Image from "next/image";

function MemberCard({ memberId }: { memberId: string }) {
  const currentMember = memberData.get(memberId);

  if (!currentMember) return;

  return (
    <div className="cursor-pointer flex flex-col w-[80%] max-w-sm h-fit bg-tertiary-superLight rounded-xl py-4 hover:border-4 border-secondary transition-all">
      <div className=" grow-[2] flex items-center justify-center py-4">
        <div className="basis-2/3 max-h-[30rem] flex items-center justify-center rounded-full  overflow-hidden bg-tertiary-superLight border-2 border-black dark:border-palewhite ">
          <div className=" w-full aspect-square relative">
            {currentMember !== undefined && (
              <Image
                src={currentMember.fotoProfil!}
                alt={currentMember.nama}
                fill
              />
            )}
          </div>
        </div>
      </div>
      <div className=" grow flex items-center justify-center flex-col p-1">
        <h3 className="developer-name">{currentMember.nama}</h3>
        <p className="developer-part">{currentMember.peran}</p>
      </div>
      <div className="flex justify-center items-center grow py-4 gap-3">
        <SocialMedia
          link={currentMember.facebook}
          role="Facebook Page"
          type="facebook"
        />
        <SocialMedia
          link={currentMember.instagram}
          role="Instagram"
          type="instagram"
        />
        <SocialMedia
          link={currentMember.twitter}
          role="Twitter Page"
          type="twitter"
        />
        <SocialMedia
          link={currentMember.github}
          role="Github Account"
          type="github"
        />
      </div>
    </div>
  );
}

export default MemberCard;
