import Description from "@/components/AboutUs/description";
import Header from "@/components/AboutUs/header";
import MemberListPage from "@/components/AboutUs/MemberCards/member-list-page";
import Tagline from "@/components/AboutUs/tagline";

function AboutUs() {
  return (
    <div>
      <Header />
      <Description />
      <Tagline />
      <MemberListPage />
    </div>
  );
}

export default AboutUs;
