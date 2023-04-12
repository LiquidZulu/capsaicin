
# Table of Contents

1.  [Installation](#org5c267ff)
2.  [Usage](#org7c2ed85)
    1.  [Options](#orgd85636e)
3.  [Development](#orga6df04c)
    1.  [Scripts](#orgf84d518)

An AI captioning tool written with `inversify.js`. Capsaicin is capable of either generating whisper captions for a given audio file or converting an .srt captions file into a series of images.


<a id="org5c267ff"></a>

# Installation

This script requires that you install the [OpenAI Whisper](https://github.com/openai/whisper) cli, and [ImageMagick](https://imagemagick.org/). If you do not wish to use Whisper functionality or vice versa for the image outputs this step can be neglected. You will also need to have [NodeJS](https://nodejs.org/en) and [yarn](https://yarnpkg.com/) installed. Then see [scripts](#orgf84d518) for instructions on how to build.


<a id="org7c2ed85"></a>

# Usage

    capsaicin [options] [filenames...]


<a id="orgd85636e"></a>

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
<td class="org-left"><code>-V, --version</code></td>
<td class="org-left">output the version number</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>--outdir &lt;path&gt;</code></td>
<td class="org-left">The directory to output files to</td>
<td class="org-left">./capsaicin</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-w, --whisper</code></td>
<td class="org-left">Generate captions for [filenames&#x2026;] with OpenAI Whisper</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-c, --convert</code></td>
<td class="org-left">Convert given caption file(s) to the supplied format</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-p, --png</code></td>
<td class="org-left">Export captions as PNG images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-j, --jpg</code></td>
<td class="org-left">Export captions as JPEG images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-g, --gif</code></td>
<td class="org-left">Export captions as GIF images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>-t, --tiff</code></td>
<td class="org-left">Export captions as TIFF images</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>--noCUDA</code></td>
<td class="org-left">Disable CUDA support (try this option if you get Whisper errors)</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>--im-size &lt;size&gt;</code></td>
<td class="org-left">The -size input provided to ImageMagick</td>
<td class="org-left">1920x1080</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>--im-pointsize &lt;pointsize&gt;</code></td>
<td class="org-left">The -pointsize input provided to ImageMagick</td>
<td class="org-left">48</td>
<td class="org-left">&#xa0;</td>
</tr>


<tr>
<td class="org-left"><code>--im-gravity &lt;gravity&gt;</code></td>
<td class="org-left">The -gravity input provided to ImageMagick</td>
<td class="org-left">South</td>
<td class="org-left">magick -list gravity</td>
</tr>


<tr>
<td class="org-left"><code>--im-font &lt;font&gt;</code></td>
<td class="org-left">The -font input provided to ImageMagick</td>
<td class="org-left">Cubano-Normal</td>
<td class="org-left">magick -list font</td>
</tr>


<tr>
<td class="org-left"><code>--model &lt;model&gt;</code></td>
<td class="org-left">The model for Whisper to use</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">whisper &#x2013;help</td>
</tr>


<tr>
<td class="org-left"><code>-h, --help</code></td>
<td class="org-left">Display helptext</td>
<td class="org-left">&#xa0;</td>
<td class="org-left">&#xa0;</td>
</tr>
</tbody>
</table>


<a id="orga6df04c"></a>

# Development


<a id="orgf84d518"></a>

## Scripts

Capsaicin provides the following scripts, which can be launched through `yarn name_of_script`:

-   <del>`run` &#x2014; run test suites</del>
-   <del>`ui` &#x2014; run test server</del>
-   `dev` &#x2014; run development server, which will build the typescript upon save
-   `build` &#x2014; compile the typescript to javascript
-   `start` &#x2014; launch the compiled javascript

