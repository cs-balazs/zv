## Logika és informatikai alkalmazásai

### 1. Normálformák az ítéletkalkulusban, Boole-függvények teljes rendszerei. Következtető módszerek: Hilbert-kalkulus és rezolúció, ezek helyessége és teljessége.

#### Normálformák az ítéletkalkulusban

##### * Ítéletkalkulus-beli formulák

- Minden **változó**, és minden **logikai konstans** formula

- Ha $F$ formula, akkor $( \neg F )$ is formula

- Ha $F$ és $G$ formulák, akkor $(F \land G), (F \lor G), (F \leftrightarrow G)$ is formulák

- **Más formula nincs**

##### Konjunktív normálforma (CNF)

- **Literál**: CNF legkisebb eleme, lehet egy **válzotó**, vagy egy **változó negáltja**.
  
  - **Negatív literál**: Ha egy változó negáltja alkotja.
  
  - **Pozitív literál**: Ha egy nem negált változó alkotja.

- **Klóz**: Véges sok **literál diszjunkciója** (vagyolása).
  
  - **Egységklóz**: 1db változóból álló klóz.
  
  - **Üres klóz**: 0db változóból álló klóz.
    
    - Értéke minden értékadás mellett **hamis**.
    
    - Jele: $\square$

- **CNF**: **Klózok konjunkciója** (éselése).
  
  - **Üres CNF**: 0db klózt tartalmaz.
    
    - Értéke minden értékadás mellett **igaz**.
    
    - Jele: $\emptyset$

> Üres klóz az inputban jellemzően nincs, de az algoritmusok generálhatnak.

###### Minden formula ekvivalens CNF alakra hozható.

1. $\to$ és $\leftrightarrow$ konnektívák eliminálása.

2. $\neg$-k bevitele változók mellé deMorgan azonosságokkal.

3. $\lor$ jelek bevitele a $\land$ jelek alá disztributivitás alkalmazásával.

> Disztributivitás szabályai:
> $F \lor (G \land H) \equiv (F \lor G) \land (F \lor H)$
> $(F \land G) \lor H \equiv (F \lor H) \land (G \lor H)$

> A "konnektíva" azt jelenti, hogy az operátor formulákat vár (köt össze), nem változókat (az a Boole-függvény).

###### CNF-ek reprezentálása

Nem stringként, hanem:

- egy klózt a benne szereplő literálok halmazaként,

- egy CNF-et pedig a klózainak halmazaként.

> Ezt azért tehetjük meg, mert sem a vagyolás, sem az éselés esetén nem számít a sorrend, illetve az érintett változók multiplicitása sem, pl. $(p \lor p) \land (q \lor q)$ ugyan az, mint $q \lor p$ (sorrend fordult, multiplicitás eltűnt).

##### Diszjunktív normálforma

Ugyan az, mint a CNF, csak nem "vagyolások éselése", hanem "éselések vagyolása".

##### Negációs normálforma

Ha $\neg$ csak változó előtt szerepel, és $\neg$-en kívül csak $\lor$ és $\land$ szerepel.

> Ilyet kapunk ha a CNF-re hozást csak a 2. lépésig csináljuk.

#### Boole-függvények teljes rendszerei

##### * Boole függvény ($n$-változós)

Bitvektort egy bitbe képező függvény: $f: \{ ~ 0, 1 ~ \}^n \to \{ ~ 0, 1 ~ \}$

$f$ egy $n$-változós függvény jelölése: $f / n$

A $\neg$ unáris, egyváltozós Boole-függvény

A többi 4 megadható 4 soros igazságtáblával.

##### * Indukált Boole-függvény

Ha az $F$ formulában csak a $\{ ~ p_1, ..., p_n ~ \}$ változók szerepelnek, akkor $F$ indukál egy $n$-változós Boole-függvényt, melyet szintén $F$-el jelölünk:

- $p_i(x_1, ..., x_n)  := x_i$ (ez **projekció** / tömbelem kiválasztás)

- $(\neg F)(x_1, ..., x_n) := \neg (F(x_1, ..., x_n))$

- $(F \lor G)(x_1, ..., x_n) := F(x_1, ..., x_n) \lor G(x_1, ..., x_n)$

- ...

> A Boole-függvénynek átadott bitvektor tulajdonképpen a formula egy értékadása. A visszaadott bit pedig a formula kiértékelésének eredménye.

##### * Boole-függvények megszorítása

Legyen $f/n$ a Boole-függvény, $n > 0$. Ha $b \in \{ ~ 0, 1 ~ \}$ igazságérték, úgy $f|_{x_n=b}$ jelöli azt az $(n - 1)$ változós Boole-függvényt, melyet úgy kapunk, hogy $f$ inputjában $x_n$ értékét rögzítjük $b$-re.

Azaz: $f|_{x_n = b}(x_1, ..., x_{n-1}) := f(x_1, ..., x_{n-1}, b)$

Például:

- $\lor |_{x_2 = 1}$ a konstans 1 függvény.

- $\land |_{x_2 = 0}$ a konstans 0 függvény.

> Bármenyik koordinátát lehet rögzíteni, nem csak az utolsót.

##### Teljes rendszerek

Boole-függvények egy $H$ rendszere teljes, vagy adekvált, ha minden $n$-változós Boole-függvény előáll

- a **projekcióból**

- és $H$ elemeiből

- alkalmas **kompozícióval**.

###### Kompozíció

Ha $f/n$ és $g_1/k, ..., g_n/k$ Boole-függvények, akkor az $f \circ \lang g_1, ..., g_n \rang$ az a $k$-változós Boole-függvény, melyre: $(f \circ \lang g_1, ..., g_n \rang)(x_1, ..., x_n) = f(g_1(x_1, ..., x_k), ..., g_n(x_1, ..., x_k))$

> Azaz egy függvényt úgy hívunk meg, hogy az inputjai függvényhívások eredményei.

##### Shannon expanzió

$f(x_1, ..., x_n) = (x_n \land f |_{x_n = 1}(x_1, ..., x_{n-1})) \lor ( \neg x_n \land f |_{x_n = 0}(x_1, ..., x_{n-1}))$

> Lényegében ezzel azt írtuk le, hogy az $x_n$ értéke vagy úgy igaz a formula, hogy $x_n = 1$, vagy úgy, hogy $x_n = 0$.

Ennek a következménye: Minden Boole függvény előáll a projekciók, és a $\{ ~ \neg, \land, \lor ~ \}$ alkalmas kompozíciójaként. (Hiszen az előző összefüggésben csak ezeket használjuk fel, és ez ismételhető amíg nem kötöttünk le minden változót.)

Ezt úgy is lehet mondani, hogy a $\{ ~ \neg, \lor, \land ~ \}$ **rendszer teljes**.

Ebből az is következik, hogy minden Boole-függvény indukálható olyan formulával, melyben csak a $\{ ~ \neg, \land, \lor ~ \}$ konnektívák szerepelnek.

##### További teljes rendszerek

- $\{ ~ \neg, \land ~ \}$: Mivel $x_1 \land x_1 = \neg (\neg x_1 \lor \neg x_2)$

- $\{ ~ \to, \downarrow ~ \}$ `// Hilbert rendszere`

- $\{ ~ \text{NAND} ~ \}$

- $\{ ~ \text{NOR} ~ \}$

> A NAND-on, és NOR-on kívül nincs másik olyan $f/2$ Boole-függvény, ami egyedül is teljes rendszert alkot.

#### Hilbert rendszere

Egy input $\Sigma$ **formulahalmaz** összes következményét (és csak a következményeket) lehet vele levezetni.

Az ítéletváltozókon kívül ebben a rendszerben csak a $\to$ konnektívát, és a $\downarrow$ logikai konstanst használhatjuk.

> Minden formula ilyan alakra hozható, mert $\{ ~ \to, \downarrow ~ \}$ teljes rendszer.

##### A Hilbert rendszer axiómái

- $(F \to (G \to H)) \to ((F \to G) \to (F \to H))$

- $F \to (G \to F)$

- $((F \to \downarrow )\to \downarrow) \to F$

> EZen a formulák **tautológiák**. Azaz minden értékadás mellett igazak.

##### Az axiómák példányai

A 3 axióma egy **példánya**: valamelyik axiómában szereplő $F, G, H$ helyére **tetszőleges formulát** írunk.

Ennek van jelölése is: Ha $F$ egy formula, melyben a $p_1, ..., p_n$ változók szerepelnek, és $F_1, ..., F_n$ formulák, akkor $F[p_1/F_1, ..., p_n/F_n]$ jelöli azt a formulát, melyet úgy kapunk $F$-ből, hogy benne minden $p_i$ helyére az $F_i$ formulát írjuk.

##### Leválasztási következtetés, avagy modus ponens

$\{ ~ F, F \to G ~ \} \vDash G$

> Ha $F$-et, és $F \to G$-t már levezettük, azaz az eredeti formulánknak ők logikai következményei, akkor felvehetjük $G$-t is, mert ő is logikai következmény.

##### Levezetés Hilbert rendszerében

Legyen $\Sigma$ formulák egy halmaza, $F$ pedig egy formula. Azt mondjuk, hogy $F$ **levezethető** $\Sigma$-ból **Hilbert rendszerében**, jelben $\Sigma \vdash F$, ha van olyan $F_1, F_1, ..., F_n$ formula-sorozat, melynek minden eleme

- $\Sigma$-beli vagy

- **axiómapéldány** vagy

- előáll két korábbiból **modus ponenssel**

és melyre $F_n = F$. (Ha $\Sigma$ üres, akkor $\emptyset \vdash F$ helyett $\vdash F$-et is írhatunk) 

##### Helyesség, teljesség

###### Tautológia példányai is tautológiák

Tehát a Hilbert-rendszer **axióma-példányai tautológiák**.

Ez egy általánosabb összefüggés következménye:

Legyenek az $F$ formulában szereplő változók $p_1, ..., p_n$, és $F_1, ..., F_n$ további formulák (melyekben más változók is előfordulhatnak).
Legyen $\mathcal{A}$ egy tetszőleges értékadás.
Definiáljuk $\mathcal{B}$ értékadást a következőképpen: $\mathcal{B}(p_i) := \mathcal{A}(F_i)$
(a $p_i$ értéke $\mathcal{B}$-ben legyen az az érték, ami $F_i$ értéke $\mathcal{A}$-ban)
Ekkor: $\mathcal{B}(F) = \mathcal{A}(F[p_1/F_1, ..., p_n/F_n])$

###### Helyesség

Ha $\Sigma \vdash F$, akkor $\Sigma \vDash F$.

> Azaz, ha egy formulát le lehet vezetni $\Sigma$-ból Hilbert rendszerében, akkor az következménye is $\Sigma$-nak.

**Bizonyítás**:

- Legyen $F_1, ..., F_n$ egy $\Sigma$ fölötti levezetése $F$-nek. Teljes indukcióval megmutatjuk, hogy minden $i$-re $\Sigma \vDash F_i$

- Ha $F_i \in \Sigma$, akkor $\Sigma \vDash F_i$

- Ha $F_i$ axiómapéldány, akkor $\emptyset \vDash F_i$ (tautológiák minden elméletben szerepelnek, és az axiómapéldányok a korábbi szabály miatt tautológiák), így a monotonitás miatt $\Sigma \vDash F_i$ is igaz (nyílván ha az $\emptyset$-nak következménye, akkor egy bővebb halmaznak, a $\Sigma$-nak is).

- Ha pedig $F_i = MP(F_j, F_k)$ a $j, k < i$ indexekre, akkor
  
  - Az indukciós feltevés szerint $\Sigma \vDash F_j$ és $\Sigma \vDash F_k$ (feltételezzük, hogy a korábban felvett formulák már logikai következmények)
  
  - Tehát $\Sigma \vDash \{ ~ F_j, F_k ~ \}$
  
  - MP def miatt $F_k = F_j \to F_i: \Sigma \vDash \{ ~ F_j, F_j \to F_i ~ \}$
  
  - A leválasztási következtetés: $\{ ~ F_j, F_j \to F_i ~ \} \vDash F_i$
  
  - A tranzitivitás miatt tehát $\Sigma \vDash F_i$ (tranzitivitást kihasználjuk, mivel $\Sigma \vDash { ~ F_j, F_j \to F_i ~ } \vDash F_i$)

Így a **Hilbert-rendszer egy helyes következtető rendszer**.

###### Teljesség

**Dedukciós tétel**: Tetszőleges $\Sigma$ formulahalmazra, és $F$, $G$ formulákra $\Sigma \vdash (F \to G) \Leftrightarrow \Sigma \cup \{ ~ F ~ \} \vdash G$ 

**H-konzisztens halmazok**: Egy $\Sigma$ formulahalmazt H-konzisztensnek nevezünk, ha **nem igaz**, hogy $\Sigma \vdash \downarrow$

> Csak simán az, hogy **konzisztens** formulahalmaz, az azt jelenti, hogy **kielégíthető**.

Ekvikalens állítások tetszőleges $\Sigma$ formulahalmazra:

- Van olyan $F$ formula, melyre $\Sigma \vdash F$ és $\Sigma \vdash (F \to \downarrow)$ is igaz.

- $\Sigma$ **nem** H-kozisztens.

- $\Sigma \vdash F$ minden $F$ formulára.

**Maximális H-konzisztens halmazok**: Egy $\Sigma$ formulahalmazt maximális H-konzisztensnek nevezünk, ha

- $\Sigma$ H-konzisztens, és

- minden $F \notin \Sigma$-ra $\Sigma \cup \{ ~ F ~ \}$ már nem H-konzisztens.

> Minden $\Sigma$ H-konzisztens halmazhoz van $\Sigma' \supseteq \Sigma$ maximális H-konzisztens halmaz. "A halmmazt fel lehet fújni."

Ha $\Sigma$ maximális H-konzisztens halmaz, akkor tetszőleges $F$ formulára vagy $F \in \Sigma$, vagy $(F \to \downarrow ) \in \Sigma$, de nem mindkettő.

> Azaz minden **formulát, vagy a negáltját** tartalmazzák, de csak az egyiket.

Tetszőleges $\Sigma$ formulahalmaz pontosan akkor kielégíthető, ha H-konzisztens.

**A Hilbert-rendszer helyessége és teljessége**:

Ezt kell belátni: $\Sigma \vDash F \Leftrightarrow \Sigma \vdash F$

> Most itt egyszerre van belátva mindkettő, de a helyesség fentebbi alapján külön is belátható.

Sorban minden ekvivalenciát tovább feltünk ekvivalencia mentén:

$\Sigma \vDash F ~ ~ \Leftrightarrow ~ ~ \Sigma \cup \{ ~ F \to \downarrow ~ \} \vDash \downarrow$

> Ennek az alapja egy tétel: $\Sigma \vDash F$ pontosan akkor igaz, ha $\Sigma \cup \{ ~ \neg F ~ \}$ kielégíthetetlen. Ez van itt felírva Hilbert-rendszerében.

$\Leftrightarrow ~ ~ \Sigma \cup \{ ~ F \to \downarrow ~ \} \vdash \downarrow$

> Itt a bal oldal azt jelenti, hogy az a halmaz kielágíthetetlen (az összeuniózott). Akkor ez a halmaz nem H-konzisztens, és ekkor levezethető belőle Hilbert-rendszerében az azonosan hamis.

$\Leftrightarrow ~ ~ \Sigma \vdash (F \to \downarrow ) \to \downarrow$

> Dedukciós tétel alkalmazása.

$\Leftrightarrow ~ ~ \Sigma \vdash F$

Ennek a legutolsó lépésnek a belátása kicsit nehezebb:

- Egyik irány: $(\Sigma \vdash (F \to \downarrow ) \to \downarrow) \to (\Sigma \vdash F)$
  
  - $((F \to \downarrow ) \to \downarrow ) \to F$
  
  - > A 3. axióma példányosítása
  
  - $\Sigma \vdash F$
  
  - > Modus ponens alkalmazása

- Másik irány: $(\Sigma \vdash F) \to (\Sigma \vdash (F \to \downarrow ) \to \downarrow)$
  
  - $((F \to \downarrow) \to (F \to \downarrow )) \to (((F \to \downarrow) \to F) \to ((F \to \downarrow) \to \downarrow ))$
  
  - > Az 1. axióma példányosítása
  
  - $(F \to \downarrow) \to (F \to \downarrow)$
  
  - > Ilyet ér felvenni, hiszen $G \to G$ alakú, és erre volt példa, hogy az ilyenek az $\emptyset$-nak is logikai következményei.
  
  - $((F \to \downarrow ) \to F) \to ((F \to \downarrow) \to \downarrow)$
  
  - > Előző kettő MP-el
  
  - $F \to ((F \to \downarrow) \to F )$
  
  - > A 2. axióma példánya
  
  - $(F \to \downarrow) \to F$
  
  - > Előző formula, és feltevés miatt $F$ MP-e
  
  - $(F \to \downarrow) \to \downarrow$
  
  - > Előző, és az előtt kettővel levő formulák MP-je

Az ekvivalenciák mentén beláttuk, hogy **Hilbert-rendszere helyes, és teljes**. Azaz tetszőleges $\Sigma$ halmazból Hilbert rendszerében **pontosan** $\Sigma$ következményei vezethetőek le.

#### Rezolúció

##### Rezolúciós következtetés

$\{ ~ F \lor G, \neg F \lor H ~ \} \vDash G \lor H$

> Nyílván, mert ha az $F$ igaz, akkor $H$ igaz kell, hogy legyen, ha $F$ hamis, akkor $G$ igaz kell, hogy legyen.

> Emlékeztető: Logikai következmény jelentése: Bármely értékadás mellett ha a bal oldal igaz (jelen esetben bal oldalon minden igaz, mert egy halmaz áll ott), akkor a jobb is.

##### Rezolvens

Ha $C$ és $D$ klózok, $p \in C$ és $\neg p \in D$, akkor $C$ és $D$ ($p$ menti) rezolvense a $(C - \{ ~ p ~ \}) \cup (D - \{ ~ \neg p ~ \})$ klóz.

> Egy új, harmadik klóz keletkezik.

##### Rezolúciós algoritmus

**Input**: Klózok $\Sigma$ halmaza.

**Output**: Kielégíthetetlen-e $\Sigma$?

**Algoritmus**: Listát vezetünk klózokról. Egy klózt felveszünk, ha 

- $\Sigma$-beli, vagy

- két, a listán már szereplő klóz rezolvense.

Ha az $\square$ üres klóz rákerül a listára, a $\Sigma$ kielégíthetetlen.

Ha már nem tudunk új klózt felvenni és $\square$ nincs köztük, $\Sigma$ kielégíthető.

> Kielégíthető formulahalmazra nem feltétlen áll meg az algoritmus. Ezért kérdezzük inkább, hogy kielégíthetetlen-e.

> Egyszerre több literál mentén nem ér rezolválni!!

###### Helyesség

Ha az algoritmus "kielégíthetetlen" válasszal áll meg, akkor az input $\Sigma$ valóban kielégíthetetlen.

Azt látjuk be, hogy minden klóz, ami a listára kerül, az logikai következménye $\Sigma$-nak. Ezt indukcióval tesszük: ha a $C$ klóz $n$. elemként kerül a listára, akkor:

- Ha $C \in \Sigma$, akkor $\Sigma \vDash C$ mindig teljesül.

- Ha $C$ a korábban felvett $C_1$ és $C_2$ klózok **rezolvense**, akkor
  
  - indukciós feltevés szerint $\Sigma \vDash C_1$ és $\Sigma \vDash C_2$
  
  - tehát $\Sigma \vDash \{ ~ C_1, C_2 ~ \}$ (nyílván, összevagyolni ér őket)
  
  - a **rezolúciós következtetés** szerint pedig $\{ ~ C_1, C_2 ~ \} \vDash C$ (rezolúciós rész eleje) (onnan tudjuk, hogy $C$ a rezolvense $C_1$-nek, és $C_2$-nek, hogy ez a feltevés ebben a második esetben)
  
  - így a $\vDash$ tranzitivitása miatt $\Sigma \vDash C$.

Így tehát ha $\Sigma \vDash \square$, akkor $\Sigma$ valóban kielégíthetetlen, mert kövezketménye a *hamis*. ($Mod(\square) = \emptyset$, nincs őt kielégítő értékadás)

###### Teljesség

Ha $\Sigma$ kielégíthetetlen, akkor az algoritmus mindig a "kielégíthetetlen" válasszal áll meg.

**Minimális kielégíthetetlen részhalmaz**:
A $\Sigma$ kielégíthetetlen klózhalmaznak a $\Sigma' \subseteq \Sigma$ egy **minimális kielégíthetetlen részhalmaza**, ha $\Sigma'$ is kielégíthetetlen, de $\Sigma'$ bármelyik valódi részhalmaza már kielégíthető. 

**Lineáris rezolúció**:
**Input**: $\Sigma$ klózhalmaz.
**Output**: Kielégíthetetlen-e $\Sigma$?
**Algoritmus**: Listát vezetünk klózokról:

- Az első lépésben felvehetjük $\Sigma$ **bármelyik elemét**, ez lesz a levezetés **bázisa**.

- Minden további lépésben felvehetjük az előző lépésben felvett klóznak, és egy vagy már a listán szereplő, vagy $\Sigma$-beli klóznak a rezolvensét. Ezt a másik klózt hívjuk ennek a lépésnek az **oldalklózának**.

**Lineáris rezolúció teljessége**:

Ha $\Sigma$ kielégíthetetlen, és $C \in \Sigma$ benne van a $\Sigma$ egy **minimális kielégíthetetlen részhalmazában**, akkor $\Sigma$-ból levezethető az üres klóz olyan **lineáris rezolúciós** levezetéssel, melynek **bázisa** $C$.

**Bizonyítás**:

Az állítást a $\Sigma$-beli változók $n$ száma szerinti indukcióval látjuk be.

- Ha $n = 0$, azaz $\Sigma$-ban nincs változó, akkor vagy $\Sigma = \{ \}$ (ekkor nincsen benne klóz), vagy $\Sigma = \{ ~ \square ~ \}$ (ekkor van benn egy klóz, az üres klóz)
  
  - A kettő közül $\Sigma = \{ ~ \square ~ \}$ a kielégíthetetlen.
  
  - Ennek $\square$ az egyetlen eleme, ez egy minimális kielégíthetetlen részhalmazának is eleme.
  
  - Ha felvesszük bázisként, már le is vezettük az üres klózt.

- Ha $n > 0$, akkor vegyünk egy $C$ klózt, mely szerepel $\Sigma$ egy minimális kielégíthetetlen részhalmazában. Legyen ez a részhalmaz $\Sigma'$.
  
  - Ha $C = \square$, kész vagyunk: vegyük fel bázisnak.
  
  - Különben legyen $l \in C$ egy $C$-beli literál.
  
  - Vegyük észre: minimális kielégíthetetlen részhalmazban nincs pure literál, hiszen ha $l$ pure literál lenne, akkor $\Sigma$-nak egy valódi részhalmaza $\Sigma'|_{l = 1}$ is kielágíthetetlen lenne. Tehát $\Sigma'$-ben $\overline{l}$ is szerepel valahol.

- Vegyük a $\Sigma'|_{l = 0}$ és $\Sigma'|_{l = 1}$ klózhalmazokat.

- Mivel $\Sigma'$ kielégíthetetlen, ezek is azok.

- Bennük csak legfeljebb $n - 1$ változó szerepel (mert $l$ változója kiesik), így alkalmazhatjuk az indukciós feltevést.

- A $\Sigma'|_{l=0}$ klózhalmaznak $C - \{ ~ l ~ \}$ is eleme, sőt egy minimális kielégíthetetlen részhalmazának is eleme (mert különben $\Sigma' - \{ ~ C ~ \}$ is kielégíthetetlen lenne).

- Tehát $\Sigma'|_{l = 0}$-ból az indukciós feltevés szerinte van $\square$-nak egy $C_1, C_2, ..., C_m$ lineáris rezolúciós levezetése, melynek $C_1 = C - \{ ~ l ~ \}$ a bázisa.

- "Visszaemelve" a $\Sigma|_{l = 0}$ cáfolatot $\Sigma'$ fölötti levezetéssé, az új levezetésben minden klózba bekerül az $l$ literál.

- Ez igaz a bázisra, és minden lépésben az eredeti $C_1$ és $C_2$ klózok rezolvense helyett a $C \cup \{ ~ l ~ \}$ és $C_2$ vagy $C_2 \cup \{ ~ l ~ \}$ klózok rezolvensét kapjuk, ami rezolvens, plusz $l$

- Tehát a konstrukciónak a végén az $\{ ~ l ~ \}$ egységklóznál jár a lineáris rezolúciós levezetés.

- Mivel $\Sigma'$ minimális kielégíthetetlen, kell legyen benne olyan $C$ klóz is, mely $\overline{l}$-t tartalmazza.

- Akkor $\Sigma'|_{l = 1}$-nek egy minimális kielégíthetetlen részhalmazában szerepel $C - \{ ~ \overline{l} ~ \}$

- Ebből a klózból indulva az indukciós feltevés szerint van $\Sigma'|_{l = 1}$-nek lineáris rezolúciós cáfolata

- Az előző fázisban kapott $\{ ~ l ~ \}$ egységklózt tudjuk rezolválni ezzel a $C$ klózzal, tehát a $\Sigma'|_{l = 1}$ cáfolatát "fel tudjuk emelni" $\Sigma'$ fölötti levezetéssé.

- A felemelt levezetés végén vagy $\square$-t, vagy $\{ ~ \overline{l} ~ \}$-t kapunk. Utóbbi esetben még egyszer rezolválunk $\{ ~ l ~ \}$-lel mint oldalklózzal, és kész vagyunk

### 2. Normálformák az elsőrendű logikában. Egyesítési algoritmus. Következtető módszerek: Alap rezolúció, és elsőrendű rezolúció, ezek helyessége és teljessége.
