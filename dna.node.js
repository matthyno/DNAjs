const _dtr = {"A": "U", "T": "A", "C": "G", "G": "C", " ": " "};
var _rtaa = [[/UU[UC]/g, "Phe"],
[/UU[AG]/g, "Leu"],
[/CU[AUCG]/g, "Leu"],
[/AU[UCA]/g, "Ile"],
[/^AUG/g, "Met"],
[/GU[AUCG]/g, "Val"],
[/UC[AUCG]/g, "Ser"],
[/UC[UC]/g, "Ser"],
[/CC[AUCG]/g, "Pro"],
[/AC[AUCG]/g, "Thr"],
[/GC[AUCG]/g, "Ala"],
[/UA[UC]/g, "Tyr"],
[/CA[UC]/g, "His"],
[/AA[UC]/g, "Asn"],
[/AA[AG]/g, "Lys"],
[/GA[UC]/g, "Asp"], 
[/GA[GA]/g, "Glu"], 
[/UG[UC]/g, "Cys"], 
[/UGG/g, "Trp"],
[/CG[AUCG]/g, "Arg"],
[/AG[AG]/g, "Arg"],
[/GG[AUCG]/g, "Gly"],
[/UA[AG]/g, "STOP"],
[/UGA/g, "STOP"]]; // first element is regex to match result, 2nd element is thing that will replace the matched regex

var dtr=(inp) => {n="";inp.split("").forEach((e) => {n += _dtr[e]; n+=((!(Math.ceil(e.length*3/4) % 3)) ? "a" : "");});return n;}; // splits the DNA codons into individual parts, replaces it with the corresponding RNA, then returns it in the same format as DNA was, but in RNA. (DNA to RNA)

var rtaa = (mRNA) => { // RNA to amino acids
    var n = "";
    var startnow = true;
    mRNA.split(" ").forEach((codon) => {
        _rtaa.forEach((matcher) => {
            var res = codon.replace(...matcher);
            if(res == "Met" && startnow) { // makes sure that Met is not the same as START, and that START is not Met.
                startnow = false;
                n += "START";
            } else {
                n += res != codon ? res : "";
            }
        });
        n += "-"; // adds the dashes inbetween the amino acids.
    })
    n = n.slice(0, -1); // removes the last extra dash at the end.
    return n;
    
};

// NodeJS only:
module.exports = {
    dtr: dtr,
    rtaa: rtaa
};
