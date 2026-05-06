import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";

export default function PageLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}