( function ( M ) {
	var TableOfContents = M.require( 'mobile.toc/TableOfContents' ),
		Toggler = M.require( 'mobile.startup' ).Toggler,
		eventBus = M.require( 'mobile.startup/eventBusSingleton' );

	/**
	 * Create TableOfContents if the given Page has sections and is not the main page
	 * and wgMFTocEnabled config variable is set to true.
	 * @method
	 * @param {Page} page for which a TOC is generated
	 * @ignore
	 */
	function init( page ) {
		var toc,
			sections = page.getSections(),
			$toc = $( '#toc' );

		toc = new TableOfContents( {
			sections: sections
		} );

		// eslint-disable-next-line no-new
		new Toggler( {
			$container: toc.$el,
			prefix: 'toc-',
			page: null,
			isClosed: true,
			eventBus: eventBus
		} );
		// if there is a toc already, replace it
		if ( $toc.length > 0 ) {
			// don't show toc at end of page, when no sections there
			$toc.replaceWith( toc.$el );
		} else {
			// otherwise append it to the lead section
			toc.appendTo( page.getLeadSectionElement() );
		}
	}

	// add a ToC only for "view" action (user is reading a page)
	// provided a table of contents placeholder has been rendered
	if ( mw.config.get( 'wgAction' ) === 'view' && $( '#toc' ).length > 0 ) {
		init( M.getCurrentPage() );
	}

}( mw.mobileFrontend ) );
