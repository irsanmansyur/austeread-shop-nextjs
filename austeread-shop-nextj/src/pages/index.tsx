import { ReactElement, useEffect, useState } from "react";
import PublicLayout from "@/layouts/public-layout";
import type { NextPageWithLayout } from "./_app";
import { AppInterface } from "@/commons/interface/app";
import TitleKategori from "@/components/title-kategori";
import ArticleCard from "@/components/article/article-card";
import SeoLayout from "@/layouts/seo-layout";
import KategoriNavbar from "@/components/kategori-navbar";
import SelectCustom from "@/components/form/select";
import ProductCardHome from "@/components/product/product-card-home";
import axios from "axios";

type Props = { news: AppInterface.ArticleGroupKategori[] };
const Home: NextPageWithLayout<Props> = ({ news, ...props }) => {
  const articlesJoins = news.reduce((a: AppInterface.Article[], b) => {
    b.value.map((art, i) => {
      if (i < 3) {
        a.push(art);
      }
    });
    return a;
  }, []);
  const [articlesSort, setArticlesSort] = useState<AppInterface.Article[][]>([]);
  const [colsArt, setColsArt] = useState(3);
  useEffect(() => {
    let arts: AppInterface.Article[][] = [];
    articlesJoins.forEach((article, i) => {
      const keyMod = (i + 1) % colsArt;
      let ky = 0;
      if (keyMod == 2) ky = 1;
      else if (keyMod == 0) ky = 2;
      if (!arts[ky]) arts[ky] = [article];
      else arts[ky].push(article);
    });

    setArticlesSort(arts);
    return () => {};
  }, [news, colsArt, articlesJoins]);

  useEffect(() => {
    const handleResize = () => {
      setColsArt(window.innerWidth < 500 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.addEventListener("resize", handleResize);
    };
  }, []);
  return (
    <SeoLayout title="Austeread Shop" descrtiption="Selamat datang di austeread shop">
      <div className="container">
        <KategoriNavbar />
        <div className="flex justify-end px-2 ">
          <div className="flex items-center gap-2">
            <span>Sort by</span>
            <select className="p-[2px] border-dark border">
              <option>Sort</option>
              <option value="">Newest</option>
              <option value="">Populer</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 px-2 my-2">
          {[1, 22, 2, 3, 4, 5, 6, 12, 14, 13].map((e) => {
            return <ProductCardHome key={e} />;
          })}
        </div>
        <div className="flex justify-center py-4">
          <button className="py-2 w-2/3 border border-dark font-GarnettBold font-bold">Load More...</button>
        </div>
      </div>
      <div className="container all-article px-2 sm:px-0 py-5 space-y-6">
        <div className="articles-header">
          <TitleKategori text="Wanna read some article?" />
        </div>
        <div className="body">
          <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${colsArt}, minmax(0, 1fr))` }}>
            {articlesSort.map((indexArticle, i) => {
              return (
                <div className="flex flex-col gap-4" key={i}>
                  {indexArticle.map((article) => {
                    return <ArticleCard key={article.id} article={article} />;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SeoLayout>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <PublicLayout {...page.props}>{page}</PublicLayout>;
};

// This gets called on every request
export async function getServerSideProps() {
  const { data: products } = await axios.get(process.env.NEXT_PUBLIC_BASE_API + "products/?limit=10");
  console.log("products", products);

  const { data: news } = await axios.get(process.env.BASE_LOCAL_API + "article-home");

  return { props: { news: news } };
}
export default Home;
