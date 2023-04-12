
# Table of Contents

1.  [Installation](#orge0636d5)
2.  [Usage](#orge3c78c0)
    1.  [Options](#org2ab536b)
3.  [Development](#org596a20d)
    1.  [Scripts](#org0abb013)

An AI captioning tool written with `inversify.js`. Capsaicin is capable of either generating whisper captions for a given audio file or converting an .srt captions file into a series of images.


<a id="orge0636d5"></a>

# Installation

This script requires that you install the [OpenAI Whisper](https://github.com/openai/whisper) cli, and [ImageMagick](https://imagemagick.org/). If you do not wish to use Whisper functionality or vice versa for the image outputs this step can be neglected. You will also need to have [NodeJS](https://nodejs.org/en) installed.


<a id="orge3c78c0"></a>

# Usage

    capsaicin [options] [filenames...]


<a id="org2ab536b"></a>

## Options

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<thead>
<tr>
<th scope="col" class="org-left">Flag</th>
<th scope="col" class="org-left">Purpose</th>
<th scope="col" class="org-left">Default</th>
<th scope="col" class="org-left">Choices</th>
</tr>
</thead>

<tbody>
<tr>
<td class="org-left">-V, &#x2013;version</td>
<td class="org-left">output the version number</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;outdir &lt;path&gt;</td>
<td class="org-left">The directory to output files to</td>
<td class="org-left">./capsaicin</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-w, &#x2013;whisper</td>
<td class="org-left">Generate captions for [filenames&#x2026;] with OpenAI Whisper</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-c, &#x2013;convert</td>
<td class="org-left">Convert given caption file(s) to the supplied format</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-p, &#x2013;png</td>
<td class="org-left">Export captions as PNG images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-j, &#x2013;jpg</td>
<td class="org-left">Export captions as JPEG images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-g, &#x2013;gif</td>
<td class="org-left">Export captions as GIF images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-t, &#x2013;tiff</td>
<td class="org-left">Export captions as TIFF images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;noCUDA</td>
<td class="org-left">Disable CUDA support (try this option if you get Whisper errors)</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;im-size &lt;size&gt;</td>
<td class="org-left">The -size input provided to ImageMagick</td>
<td class="org-left">1920x1080</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;im-pointsize &lt;pointsize&gt;</td>
<td class="org-left">The -pointsize input provided to ImageMagick</td>
<td class="org-left">48</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;im-gravity &lt;gravity&gt;</td>
<td class="org-left">The -gravity input provided to ImageMagick</td>
<td class="org-left">South</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;im-font &lt;font&gt;</td>
<td class="org-left">The -font input provided to ImageMagick</td>
<td class="org-left">Cubano-Normal</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">&#x2013;model &lt;model&gt;</td>
<td class="org-left">The model for Whisper to use</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left">-h, &#x2013;help</td>
<td class="org-left">Display helptext</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>
</tbody>
</table>


<a id="org596a20d"></a>

# Development


<a id="org0abb013"></a>

## Scripts

Capsaicin provides the following scripts, which can be launched through `yarn name_of_script`:

-   `run` &#x2014; run test suites
-   `ui` &#x2014; run test server
-   `dev` &#x2014; run development server, which will build the typescript upon save
-   `build` &#x2014; compile the typescript to javascript
-   `start` &#x2014; launch the compiled javascript

