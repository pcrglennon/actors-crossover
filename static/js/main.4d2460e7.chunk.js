(this["webpackJsonpactors-crossover-react-2"]=this["webpackJsonpactors-crossover-react-2"]||[]).push([[0],{130:function(e,t,r){},136:function(e,t,r){},150:function(e,t,r){},151:function(e,t,r){"use strict";r.r(t);var n,c,i,s=r(0),a=r.n(s),o=r(35),l=r.n(o),d=(r(130),r(123)),j=r(59),u=r(157),b=r(159),h=r(161),v=r(158),O=r(160),f=r(124),x=r(37),g=r(68),p=r(156),m=r(155),y=r(46),S=r(88),w={};!function(e){e.Public="PUBLIC",e.Private="PRIVATE"}(i||(i={}));var C=Object(x.gql)(n||(n=Object(S.a)(["\n    query ActorSearch($queryString: String!) {\n  actorSearch(queryString: $queryString, page: 1) {\n    results {\n      id\n      name\n    }\n    meta {\n      totalResults\n      totalPages\n    }\n  }\n}\n    "])));var I=Object(x.gql)(c||(c=Object(S.a)(["\n    query CrossoverMovies($actorIds: [Int!]!) {\n  crossoverMovies(actorIds: $actorIds) {\n    id\n    title\n    releaseDate\n    posterPath\n    crossoverCredits {\n      id\n      actorId\n      actorName\n      characterName\n    }\n  }\n}\n    "])));r(136);var P=r(9),q=function(e){var t=e.onActorSelect,r=e.selectedActorIds,n=Object(s.useState)(""),c=Object(j.a)(n,2),i=c[0],a=c[1],o=Object(s.useState)([]),l=Object(j.a)(o,2),d=l[0],u=l[1],b=function(e){var t=Object(y.a)(Object(y.a)({},w),e);return x.useQuery(C,t)}({variables:{queryString:i},skip:i.length<=2}),h=b.loading,v=b.data;return Object(s.useEffect)((function(){if(null===v||void 0===v?void 0:v.actorSearch.results){var e=v.actorSearch.results.filter((function(e){return!r.includes(e.id)}));u(e.map((function(e){return{key:e.id,value:e.id,label:e.name}})))}}),[v,r]),Object(P.jsx)(p.a,{searchValue:i,onSearch:function(e){return a(e)},onSelect:function(e){var r=null===v||void 0===v?void 0:v.actorSearch.results.find((function(t){return t.id===e}));r&&t(r)},options:d,loading:h,showSearch:!0,filterOption:!1,optionLabelProp:"label",notFoundContent:h?Object(P.jsx)(m.a,{size:"small"}):null,placeholder:"Search for actors",style:{width:"100%"}})},A=function(e){var t=e.movie;return Object(P.jsxs)("div",{children:[Object(P.jsxs)("h4",{children:[t.title," (",t.releaseDate,")"]}),Object(P.jsx)("ul",{children:t.crossoverCredits.map((function(e,t){return Object(P.jsxs)("li",{children:[e.actorName,": ",e.characterName]},t)}))})]})},M=function(e){var t=e.movies;return Object(P.jsx)("ul",{children:Object(P.jsx)(O.b,{direction:"vertical",children:t.map((function(e){return Object(P.jsx)("li",{children:Object(P.jsx)(A,{movie:e})},e.id)}))})})},k=(r(150),new x.ApolloClient({uri:"https://actors-crossover-gql.herokuapp.com/graphql",cache:new x.InMemoryCache})),F=function(){var e=Object(s.useState)([]),t=Object(j.a)(e,2),r=t[0],n=t[1],c=function(e){var t=Object(y.a)(Object(y.a)({},w),e);return x.useLazyQuery(I,t)}({client:k}),i=Object(j.a)(c,2),a=i[0],o=i[1],l=o.loading,p=o.error,m=o.data;function S(){return r.map((function(e){return e.id}))}return Object(P.jsx)(g.ApolloProvider,{client:k,children:Object(P.jsxs)(u.a,{children:[Object(P.jsx)(u.a.Header,{children:Object(P.jsx)("h1",{style:{margin:0,color:"white"},children:"Actors-Crossover"})}),Object(P.jsx)(u.a.Content,{style:{padding:"40px 50px"},children:Object(P.jsxs)(b.a,{gutter:16,children:[Object(P.jsx)(h.a,{xs:24,md:12,children:Object(P.jsxs)("div",{className:"search",children:[Object(P.jsx)("h3",{children:"Select one or more actors"}),Object(P.jsx)(q,{onActorSelect:function(e){n([].concat(Object(d.a)(r),[e]))},selectedActorIds:S()}),Object(P.jsx)("ul",{children:r.map((function(e){return Object(P.jsxs)("li",{children:[e.name,Object(P.jsx)(v.a,{onClick:function(t){var c;c=e.id,n(r.filter((function(e){return e.id!==c})))},icon:Object(P.jsx)(f.a,{}),shape:"circle",size:"small",style:{marginLeft:"10px"}})]},e.id)}))})]})}),Object(P.jsx)(h.a,{xs:24,md:12,children:Object(P.jsxs)("div",{className:"results",children:[Object(P.jsx)(v.a,{type:"primary",disabled:r.length<=1,loading:l,onClick:function(){return a({variables:{actorIds:S()}})},children:"Find Movies"}),l&&Object(P.jsx)("p",{children:"loading..."}),p&&Object(P.jsxs)("p",{children:["error: ",p]}),(null===m||void 0===m?void 0:m.crossoverMovies)&&Object(P.jsx)(M,{movies:m.crossoverMovies})]})})]})}),Object(P.jsx)(u.a.Footer,{style:{textAlign:"center"},children:Object(P.jsxs)(O.b,{direction:"vertical",children:[Object(P.jsx)("h4",{children:"Powered by The Movie Database API"}),Object(P.jsx)("a",{href:"https://www.themoviedb.org",target:"_blank",rel:"noreferrer",children:Object(P.jsx)("img",{alt:"Powered by The Movie DB",src:"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg",style:{width:"240px",height:"auto"}})})]})})]})})},L=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,162)).then((function(t){var r=t.getCLS,n=t.getFID,c=t.getFCP,i=t.getLCP,s=t.getTTFB;r(e),n(e),c(e),i(e),s(e)}))};l.a.render(Object(P.jsx)(a.a.StrictMode,{children:Object(P.jsx)(F,{})}),document.getElementById("root")),L()}},[[151,1,2]]]);
//# sourceMappingURL=main.4d2460e7.chunk.js.map